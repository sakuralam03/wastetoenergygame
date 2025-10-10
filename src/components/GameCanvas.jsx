import Phaser from 'phaser';
import GameScene from '../phaser/GameScene';

import { useEffect } from 'react';

export default function GameCanvas() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [GameScene]
    };

    window.phaserGame = new Phaser.Game(config); // ✅ Expose globally
  }, []);

  return <div id="phaser-container" />;
}
