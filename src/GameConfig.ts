import Phaser from 'phaser';

const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-container', // This must match your React div ID
  backgroundColor: '#ffffffff', // ← Change this to any color you want
  scene: [], // You can add scenes later
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};

export default GameConfig;
