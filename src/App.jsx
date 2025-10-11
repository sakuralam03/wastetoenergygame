import React, { useEffect, useState } from 'react';
import GameCanvas from './components/GameCanvas';
import Overlay from './components/Overlay';
import HUDOverlay from './components/HUDOverlay';

import './styles/theme.css';
import './styles/hud.css';

export default function App() {
  const [shouldStartGame, setShouldStartGame] = useState(false);
  const [phaserScene, setPhaserScene] = useState(null);

  useEffect(() => {
    if (!shouldStartGame) return;

    const interval = setInterval(() => {
      const scene = window.phaserGame?.scene?.keys?.GameScene;
      if (scene) {
        setPhaserScene(scene);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [shouldStartGame]);

  return (
    <div className="game-wrapper">
      {!shouldStartGame && (
        <div className="start-screen">
          <h1>Waste to Energy</h1>
          <button onClick={() => setShouldStartGame(true)}>Start Game</button>
        </div>
      )}

      {shouldStartGame && (
        <>
          <GameCanvas shouldStartGame={shouldStartGame} />
          <Overlay />
          <HUDOverlay
            bin={{ meter: 60, state: 'half' }}
            player={{ score: 120 }}
            onUpgrade={() => console.log('Upgrade clicked')}
          />
        </>
      )}
    </div>
  );
}
