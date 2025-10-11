export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create player sprite with physics
    this.sprite = scene.physics.add.sprite(x, y, 'player').setScale(0.2);
    this.sprite.setCollideWorldBounds(true);

    // Bin state
    this.binType = null;
    this.binSprite = null;
    this.binMeter = 0;
    this.maxMeter = 100;
    this.eatingSpeed = 700;

    // Score tracking
    this.score = 0;
  }

  // Movement logic
  setVelocity(x, y) {
    this.sprite.setVelocity(x, y);

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

    // Remove old bin sprite if it exists
    if (this.binSprite) {
      this.binSprite.destroy();
      this.binSprite = null;
    }

    // Create new bin sprite above player
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

      // Update meter
      this.binMeter = isCorrect
        ? Math.min(this.binMeter + 20, this.maxMeter)
        : Math.max(this.binMeter - 10, 0);

      // Emit events for HUD updates
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

  // Log bin status (can be extended for HUD)
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

  // Drop bin and reset state
  dropBin() {
    if (this.binSprite) {
      this.binSprite.destroy();
      this.binSprite = null;
    }

    this.binType = null;
    this.binMeter = 0;

    this.scene.events.emit('binDropped');
    this.updateBinState();
  }
}
