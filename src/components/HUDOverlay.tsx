import type { HUDOverlayProps } from '../types/gameTypes';
import '../styles/hud.css';

const HUDOverlay: React.FC<HUDOverlayProps> = ({ bin, player, onUpgrade }) => {
  return (
    <div className="hud">
      <div className="bin-meter">
        <div className="meter-fill" style={{ width: `${bin.meter}%` }}></div>
      </div>

      

      <button className="upgrade-btn" onClick={onUpgrade}>
        🔄 Upgrade
      </button>
    </div>
  );
};

export default HUDOverlay;
