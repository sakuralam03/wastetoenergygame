import Phaser from 'phaser';
import Player from './entities/player';
import { trashItems, classifyTrash } from './logic/Trashmanager';
import '../styles/theme.css';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('player', '/assets/player/player.jpeg');
    this.load.image('green_bin', '/assets/bins/green_bin.jpg');
    this.load.image('yellow_bin', '/assets/bins/yellow_bin.jpg');
    this.load.image('blue_bin', '/assets/bins/blue_bin.jpg');
    this.load.image('recycle_shop', 'assets/shops/recycle_shop.jpg');
    this.load.image('donation_shop', 'assets/shops/donation_shop.jpg');
    this.load.image('waste_shop', 'assets/shops/waste_shop.jpg');
    trashItems.forEach(item => {
      this.load.image(item.key, item.path);
    });
  }

  create() {
    this.player = new Player(this, 100, 100);
    this.player.score = 0;

    // HUD
    this.meterBar = this.add.graphics();
    this.meterText = this.add.text(20, 45, 'Bin: 0%', { fontSize: '14px', fill: '#000' });
    this.feedbackText = this.add.text(20, 70, '', { fontSize: '16px', fill: '#333' });
    this.scoreText = this.add.text(20, 100, 'Score: 0', { fontSize: '16px', fill: '#000' });

    this.events.on('meterUpdated', (value) => {
      this.meterBar.clear();
      this.meterBar.fillStyle(0xcccccc).fillRect(20, 20, 200, 20);
      let color = value > 60 ? 0x00ff00 : value > 30 ? 0xffff00 : 0xff0000;
      this.meterBar.fillStyle(color).fillRect(20, 20, value * 2, 20);
      this.meterBar.lineStyle(2, 0x000000).strokeRect(20, 20, 200, 20);
      this.meterText.setText(`Bin: ${value}%`);
    });

    this.events.on('trashFeedback', ({ correct, type }) => {
      const msg = correct ? `✅ Correct: ${type} sorted!` : `❌ Wrong bin for ${type}`;
      this.feedbackText.setText(msg);
      this.time.delayedCall(2000, () => this.feedbackText.setText(''));
    });

    this.events.on('scoreUpdated', (score) => {
      this.scoreText.setText(`Score: ${score}`);
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

    // Shops and drop zones
    const shopX = 1400;
    this.canDropBin = true;

    this.recycleShop = this.add.image(shopX, 120, 'recycle_shop').setScale(0.1);
    this.donationShop = this.add.image(shopX, 300, 'donation_shop').setScale(0.1);
    this.wasteShop = this.add.image(shopX, 480, 'waste_shop').setScale(0.1);

    this.add.text(shopX - 20, 90, 'Recycle', { fontSize: '14px', fill: '#000' });
    this.add.text(shopX - 20, 270, 'Donate', { fontSize: '14px', fill: '#000' });
    this.add.text(shopX - 20, 450, 'Waste', { fontSize: '14px', fill: '#000' });

    this.createDropZone(shopX - 60, 120, 'blue_bin', 'Recycle Shop');
    this.createDropZone(shopX - 60, 300, 'yellow_bin', 'Donation Shop');
    this.createDropZone(shopX - 60, 480, 'green_bin', 'Waste Shop');

    this.spawnTrash();
  }

  createDropZone(x, y, expectedBinType, label) {
    const zone = this.add.zone(x, y, 64, 64).setOrigin(0);
    this.physics.world.enable(zone);

    const visual = this.add.rectangle(1200, y, 64, 64, 0x4caf50).setOrigin(0);
    visual.setStrokeStyle(2, 0x000000);
    visual.setAlpha(0.4);
this.add.text(1200, y - 20, 'Drop Bin Here', {

  fontSize: '12px',
  fill: '#000',
  fontFamily: 'sans-serif'
});


    this.physics.add.overlap(this.player.sprite, zone, () => {
      if (this.canDropBin && this.player.isBinFull()) {
        if (this.player.binType === expectedBinType) {
          this.dropOffBin(expectedBinType);
          this.canDropBin = false;
          this.time.delayedCall(3000, () => (this.canDropBin = true));
        } else {
          this.showScoreFeedback(`❌ Wrong bin for ${label}!`);
        }
      }
    });
  }
  
spawnTrash() {
  this.trashGroup = this.physics.add.group();
  const shopZones = [120, 300, 480];

  trashItems.forEach(item => {
    let x, y, attempts = 0;
    let overlap = true;

    while (overlap && attempts < 50) {
      x = Phaser.Math.Between(100, 700);
      y = Phaser.Math.Between(100, 500);
      overlap = this.trashGroup.getChildren().some(existing => {
        const dx = existing.x - x;
        const dy = existing.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 40; // Minimum spacing between trash
      });

      // Avoid shop zones
      if (shopZones.some(shopY => Math.abs(y - shopY) < 80)) {
        overlap = true;
      }

      attempts++;
    }

    if (!overlap) {
      const sprite = this.trashGroup.create(x, y, item.key).setScale(0.1);
      sprite.setData('trashName', item.name);
      sprite.setInteractive();
    }
  });

  this.physics.add.overlap(this.player.sprite, this.trashGroup, (player, trash) => {
    const name = trash.getData('trashName');
    const type = classifyTrash(name);
    this.player.feedTrash(type);
    trash.destroy();
  });
}


  dropOffBin(expectedBinType) {
    if (this.player.isBinFull() && this.player.binType === expectedBinType) {
      this.player.score += 50;
      this.player.dropBin();
      this.showScoreFeedback('+50 points!');
      this.events.emit('scoreUpdated', this.player.score);
    } else if (this.player.isBinFull()) {
      this.showScoreFeedback('❌ Wrong shop for this bin!');
    }
  }

  showScoreFeedback(message) {
    const feedback = this.add.text(this.player.sprite.x, this.player.sprite.y - 40, message, {
      fontSize: '18px',
      color: '#4caf50',
      backgroundColor: '#ffffff',
      padding: { x: 6, y: 4 }
    });
    this.time.delayedCall(1500, () => feedback.destroy());
  }

  update() {
    const speed = 200;
    const moveX =
      (this.cursors.left.isDown || this.wasd.left.isDown) ? -speed :
      (this.cursors.right.isDown || this.wasd.right.isDown) ? speed : 0;

    const moveY =
      (this.cursors.up.isDown || this.wasd.up.isDown) ? -speed :
      (this.cursors.down.isDown || this.wasd.down.isDown) ? speed : 0;

    this.player.setVelocity(moveX, moveY);
  }
}
