export default function FlashcardOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      background: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)'
    }}>
      <h2>🌿 EcoQuest Flashcard</h2>
      <p>What does the ecoMeter track?</p>
    </div>
  );
}
