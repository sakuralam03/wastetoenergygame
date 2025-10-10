export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'player').setScale(0.2);
    this.sprite.setCollideWorldBounds(true);

    this.binType = null;
    this.binSprite = null;
    this.binMeter = 0;
    this.maxMeter = 100;
    this.eatingSpeed = 700; // Delay in ms
  }

  setVelocity(x, y) {
    this.sprite.setVelocity(x, y);
    if (this.binSprite) {
      this.binSprite.x = this.sprite.x;
      this.binSprite.y = this.sprite.y - 32;
    }
  }

  pickUpBin(binType) {
    this.binType = binType;
    this.binMeter = 0;

    if (this.binSprite) this.binSprite.destroy();
    this.binSprite = this.scene.add.sprite(this.sprite.x, this.sprite.y - 32, binType);
    this.binSprite.setScale(0.2);
  }

  swapBin(binType) {
    if (this.binType === binType) return;
    console.log('Swapping to bin:', binType);
    this.pickUpBin(binType);
  }

feedTrash(trashType) {
  setTimeout(() => {
    const correctType = this.getExpectedType(this.binType);
    const isCorrect = trashType === correctType;

    console.log('Feeding:', trashType, 'Expected:', correctType);
    console.log('Before meter:', this.binMeter);

    // Update meter
    if (isCorrect) {
      this.binMeter = Math.min(this.binMeter + 20, this.maxMeter);
    } else {
      this.binMeter = Math.max(this.binMeter - 10, 0);
    }

    console.log('After meter:', this.binMeter);

    // Emit meter update
    this.scene.events.emit('meterUpdated', this.binMeter);

    // Emit feedback
    this.scene.events.emit('trashFeedback', {
      correct: isCorrect,
      type: trashType
    });

    // Optional: update internal bin state
    this.updateBinState();
  }, this.eatingSpeed);
}


getExpectedType(binKey) {
  if (!binKey) return null;
  if (binKey.includes('green')) return 'generalWaste';
  if (binKey.includes('yellow')) return 'donation';
  if (binKey.includes('blue')) return 'recyclable';
  return null;
}


  updateBinState() {
    if (this.binMeter === 0) {
      console.log('🗑️ Bin is empty');
    } else if (this.binMeter < this.maxMeter) {
      console.log('🗑️ Bin is partially filled');
    } else {
      console.log('🗑️ Bin is full!');
    }
  }

  isBinFull() {
    return this.binMeter >= this.maxMeter;
  }

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
