import Phaser from 'phaser';
import GameScene from '../phaser/GameScene';
import { useEffect } from 'react';
import '../styles/GameCanvas.css';



export default function GameCanvas() {
  useEffect(() => {
    // ✅ Only create Phaser game if it doesn't already exist
    if (!window.phaserGame) {
      const config = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        parent: 'phaser-container',
        backgroundColor: '#a3d9a5', // ✅ Optional: set canvas background here
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false
          }
        },
        scene: [GameScene]
      };

      window.phaserGame = new Phaser.Game(config);
    }
  }, []);

  return <div id="phaser-container" />;
}
