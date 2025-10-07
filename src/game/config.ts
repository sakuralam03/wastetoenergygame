import Phaser from 'phaser';

const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-container',
  backgroundColor: '#a3d9a5',
  scene: [], // Add scenes like TownScene, ForestScene here
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }, // ✅ Fixes Vector2Like error
      debug: false,
    },
  },
};

export default GameConfig;
