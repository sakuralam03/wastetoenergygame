import '../styles/shop.css';


interface ShopZoneProps {
  isActive: boolean;
  type: 'recyclable' | 'donation' | 'waste';
}

const ShopZone: React.FC<ShopZoneProps> = ({ isActive, type }) => (
  <div className={`shop-zone ${isActive ? 'active' : ''}`} style={{ borderColor: `var(--color-${type})` }}>
    Drop here!
  </div>
);

export default ShopZone;
