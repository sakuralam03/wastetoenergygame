import type { HUDOverlayProps } from '../types/gameTypes';

import '../styles/hud.css';


const HUDoverlay: React.FC<HUDOverlayProps> = ({ bin, player, onUpgrade }) => {
  return (
    <div className="hud">
      <div className="bin-meter">
        <div className="meter-fill" style={{ width: `${bin.meter}%` }}></div>
      </div>
  
   
    </div>
  );
};

export default HUDoverlay;
