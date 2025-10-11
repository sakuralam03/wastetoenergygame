export const upgrades = {
  binCapacity: {
    name: 'Bin Capacity',
    effect: 'Increases max trash per bin',
    cost: 100,
    apply: (player) => {
      player.maxBinMeter += 50;
    }
  },
  movementSpeed: {
    name: 'Movement Speed',
    effect: 'Increases player speed',
    cost: 150,
    apply: (scene) => {
      scene.playerSpeed += 50;
    }
  }
};
