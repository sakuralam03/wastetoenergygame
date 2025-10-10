import { useEffect, useState } from 'react';
import '../styles/hud-overlay.css';

export default function BinMeterHUD({ phaserScene }) {
  const [meter, setMeter] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!phaserScene) return;

    const handleMeter = (value) => {
      console.log('Meter updated:', value); // ✅ Debug log here
      setMeter(value);
    };

    const handleFeedback = ({ correct, type }) => {
      const msg = correct ? `✅ Correct: ${type}` : `❌ Wrong bin for ${type}`;
      setFeedback(msg);
      setTimeout(() => setFeedback(''), 2000);
    };

    phaserScene.events.on('meterUpdated', handleMeter);
    phaserScene.events.on('trashFeedback', handleFeedback);

    return () => {
      phaserScene.events.off('meterUpdated', handleMeter);
      phaserScene.events.off('trashFeedback', handleFeedback);
    };
  }, [phaserScene]);

  return (
    <div className="hud-overlay">
      <label>Bin Meter</label>
      <progress value={meter} max={100} />
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}
