import Phaser from 'phaser';
import Player from './entities/player';

import { trashItems, classifyTrash } from './logic/Trashmanager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('Preloading images...');

    // Player and bin images
    this.load.image('player', '/assets/player/player.jpeg');
    this.load.image('green_bin', '/assets/bins/green_bin.jpg');
    this.load.image('yellow_bin', '/assets/bins/yellow_bin.jpg');
    this.load.image('blue_bin', '/assets/bins/blue_bin.jpg');

    // Trash images (auto-preload from TrashManager)
    trashItems.forEach(item => {
      this.load.image(item.key, item.path);
    });
  }

 create() {
  this.player = new Player(this, 100, 100);

  // Meter bar setup
  this.meterBar = this.add.graphics();
  this.meterText = this.add.text(20, 45, 'Bin: 0%', {
    fontSize: '14px',
    fill: '#000',
    fontFamily: 'sans-serif'
  });

  // Feedback text
  this.feedbackText = this.add.text(20, 70, '', {
    fontSize: '16px',
    fill: '#333',
    fontFamily: 'sans-serif'
  });

  // Listen for meter updates
  this.events.on('meterUpdated', (value) => {
    this.meterBar.clear();

    // Background
    this.meterBar.fillStyle(0xcccccc); // light gray
    this.meterBar.fillRect(20, 20, 200, 20);

    // Dynamic color
    let color = 0xff0000; // red
    if (value > 60) color = 0x00ff00; // green
    else if (value > 30) color = 0xffff00; // yellow

    // Fill
    this.meterBar.fillStyle(color);
    this.meterBar.fillRect(20, 20, value * 2, 20); // scale to 200px

    // Border
    this.meterBar.lineStyle(2, 0x000000);
    this.meterBar.strokeRect(20, 20, 200, 20);

    // Text label
    this.meterText.setText(`Bin: ${value}%`);
  });

  // Listen for feedback
  this.events.on('trashFeedback', ({ correct, type }) => {
    const msg = correct
      ? `✅ Correct: ${type} sorted!`
      : `❌ Wrong bin for ${type}`;
    this.feedbackText.setText(msg);

    // Fade out after 2 seconds
    this.time.delayedCall(2000, () => {
      this.feedbackText.setText('');
    });
  });

  // Movement keys
  this.cursors = this.input.keyboard.createCursorKeys();
  this.wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  // Bin swapping keys
  this.input.keyboard.on('keydown-G', () => this.player.swapBin('green_bin'));
  this.input.keyboard.on('keydown-Y', () => this.player.swapBin('yellow_bin'));
  this.input.keyboard.on('keydown-B', () => this.player.swapBin('blue_bin'));

  // Drop zone
  this.canDropBin = true;
  const dropZone = this.add.zone(500, 300, 64, 64).setOrigin(0);
  this.physics.world.enable(dropZone);
  this.physics.add.overlap(this.player.sprite, dropZone, () => {
    if (this.canDropBin && this.player.isBinFull()) {
      this.player.dropBin();
      this.canDropBin = false;
      this.time.delayedCall(3000, () => (this.canDropBin = true));
    }
  });

  this.spawnTrash();
}

  spawnTrash() {
    this.trashGroup = this.physics.add.group();

    trashItems.forEach((item) => {
      const x = Phaser.Math.Between(100, 700);
      const y = Phaser.Math.Between(100, 500);
      const sprite = this.trashGroup.create(x, y, item.key);
      sprite.setScale(0.1);
      sprite.setData('trashName', item.name);
      sprite.setInteractive();
    });

    this.physics.add.overlap(this.player.sprite, this.trashGroup, (player, trash) => {
      const name = trash.getData('trashName');
      const type = classifyTrash(name);
      console.log(`Interacted with: ${name} → ${type}`);
      this.player.feedTrash(type);
      trash.destroy();
    });
  }

  update() {
    const speed = 200;
    const moveX = (this.cursors.left.isDown || this.wasd.left.isDown) ? -speed :
                  (this.cursors.right.isDown || this.wasd.right.isDown) ? speed : 0;

    const moveY = (this.cursors.up.isDown || this.wasd.up.isDown) ? -speed :
                  (this.cursors.down.isDown || this.wasd.down.isDown) ? speed : 0;

    this.player.setVelocity(moveX, moveY);
  }
}
