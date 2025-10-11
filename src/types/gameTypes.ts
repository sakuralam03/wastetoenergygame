export interface Bin {
  meter: number;
  state: 'empty' | 'half' | 'full';
}

export interface Player {
  score: number;
}

export interface HUDOverlayProps {
  bin: Bin;
  player: Player;
  onUpgrade: () => void;
}
