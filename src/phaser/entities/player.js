export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create player sprite using texture atlas
    this.sprite = scene.physics.add.sprite(x, y, 'playerAtlas', 'player_0.png').setScale(0.5);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.play('player_walk');

    // Bin state
    this.binType = null;
    this.binSprite = null;
    this.binMeter = 0;
    this.maxMeter = 100;
    this.eatingSpeed = 700;

    // Currency tracking
    this.money = 0;
  }

  // Movement logic with animation control
  setVelocity(x, y) {
    this.sprite.setVelocity(x, y);

    // Animate only when moving
    if (x !== 0 || y !== 0) {
      this.sprite.play('player_walk', true);
    } else {
      this.sprite.stop();
      this.sprite.setTexture('playerAtlas', 'player_0.png');
    }

    // Keep bin sprite visually attached
    if (this.binSprite) {
      this.binSprite.x = this.sprite.x;
      this.binSprite.y = this.sprite.y - 32;
    }
  }

  // Equip a new bin
  pickUpBin(binType) {
    if (!binType) return;

    this.binType = binType;
    this.binMeter = 0;

    if (this.binSprite) {
      this.binSprite.destroy();
      this.binSprite = null;
    }

    this.binSprite = this.scene.add.sprite(this.sprite.x, this.sprite.y - 32, binType).setScale(0.2);
  }

  // Swap bin only if different
  swapBin(binType) {
    if (!binType || this.binType === binType) return;
    this.pickUpBin(binType);
  }

  // Feed trash into bin
  feedTrash(trashType) {
    setTimeout(() => {
      const correctType = this.getExpectedType(this.binType);
      const isCorrect = trashType === correctType;

      this.binMeter = isCorrect
        ? Math.min(this.binMeter + 20, this.maxMeter)
        : Math.max(this.binMeter - 10, 0);

      this.scene.events.emit('meterUpdated', this.binMeter);
      this.scene.events.emit('trashFeedback', { correct: isCorrect, type: trashType });

      this.updateBinState();
    }, this.eatingSpeed);
  }

  // Map bin key to expected trash type
  getExpectedType(binKey) {
    if (!binKey) return null;
    if (binKey.includes('green')) return 'generalWaste';
    if (binKey.includes('yellow')) return 'donation';
    if (binKey.includes('blue')) return 'recyclable';
    return null;
  }

  // Log bin status
  updateBinState() {
    if (this.binMeter === 0) {
      console.log('🗑️ Bin is empty');
    } else if (this.binMeter < this.maxMeter) {
      console.log('🗑️ Bin is partially filled');
    } else {
      console.log('🗑️ Bin is full!');
    }
  }

  // Check if bin is full
  isBinFull() {
    return this.binMeter >= this.maxMeter;
  }

  // Get current bin meter (for reward scaling)
  getBinMeter() {
    return this.binMeter || 0;
  }

  // Drop bin and reset state
  dropBin() {
    if (this.binSprite) {
      this.binSprite.destroy();
      this.binSprite = null;
    }

    this.binType = null;
    this.binMeter = 0;

    this.scene.events.emit('meterUpdated', 0);
    this.scene.events.emit('binDropped');
    this.updateBinState();
  }
}
