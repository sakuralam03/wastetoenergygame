import { useEffect } from 'react';
import Phaser from 'phaser';
import GameConfig from './config'; // or your actual config

export default function GameWrapper() {
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    return () => game.destroy(true);
  }, []);
  return <div id="phaser-container" />;
}
