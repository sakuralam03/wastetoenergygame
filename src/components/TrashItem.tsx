import '../styles/trash.css';


interface TrashProps {
  image: string;
  label: string;
}

const TrashItem: React.FC<TrashProps> = ({ image, label }) => (
  <div className="trash-item">
    <img src={image} alt={label} />
    <span className="trash-label">{label}</span>
  </div>
);

export default TrashItem;
