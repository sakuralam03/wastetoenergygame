import React, { useEffect, useState } from 'react';
import GameCanvas from './components/GameCanvas';
import Overlay from './components/overlay.jsx';



export default function App() {
  const [phaserScene, setPhaserScene] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const scene = window.phaserGame?.scene?.keys?.GameScene;
      if (scene) {
        setPhaserScene(scene);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>🌱 EcoQuest: Guardians of Green</h1>
      <GameCanvas />
      <Overlay />
   
    </div>
  );
}
