function InventoryCard({ item }) {
  return (
    <div className="inventory-card">
      <div className="inventory-card-image-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="inventory-card-image"
        />

        <div className="inventory-card-overlay">
          <span className="inventory-status">
            {item.status}
          </span>
        </div>
      </div>

      <div className="inventory-card-content">
        <h3 className="inventory-card-title">
          {item.title}
        </h3>

        <p className="inventory-card-price">
          {item.price}
        </p>
      </div>
    </div>
  );
}

export default InventoryCard;