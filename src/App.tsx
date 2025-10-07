import React, { useState } from 'react';
import GameWrapper from './game/GameWrapper';
import FlashcardOverlay from './ui/FlashcardOverlay';

function App() {
  const [showFlashcard, setShowFlashcard] = useState(true); // Toggle for demo

  return (
    <>
      <GameWrapper />
      {showFlashcard && <FlashcardOverlay />}
    </>
  );
}

export default App;
