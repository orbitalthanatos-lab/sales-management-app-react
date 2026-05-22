import { useState } from 'react';

function InventoryCard({ item }) {

  const [expanded, setExpanded] =
    useState(false);

  return (
    <article className="inventory-card">

      <div className="inventory-card-image-wrapper">

        <img
          src={item.image}
          alt={item.title}
          className="inventory-card-image"
        />

        <div className="inventory-card-overlay"></div>

        <div className="inventory-card-actions">

          <button className="card-action-btn">
            ✏️
          </button>

          <button className="card-action-btn">
            🗑️
          </button>

        </div>

      </div>

      <div className="inventory-card-content">

        <h3 className="inventory-card-title">
          {item.title}
        </h3>

        <div className="inventory-card-price">
          {item.price}
        </div>

        <div className="inventory-card-footer">

          <span className="inventory-card-status">
            {item.status}
          </span>

          <button
            className="inventory-expand-btn"
            onClick={() =>
              setExpanded(!expanded)
            }
          >
            {expanded ? '▲' : '▼'}
          </button>

        </div>

      </div>

      {expanded && (
        <div className="inventory-card-details">

          <div className="inventory-card-detail">
            <strong>Compra</strong>
            <span>50.00 €</span>
          </div>

          <div className="inventory-card-detail">
            <strong>Comisión</strong>
            <span>0.00 €</span>
          </div>

          <div className="inventory-card-detail">
            <strong>Beneficio</strong>

            <span className="profit-text">
              50.00 €
            </span>
          </div>

          <div className="inventory-card-detail">
            <strong>Descripción</strong>

            <p>
              Monedas originales de medio dólar Kennedy.
            </p>
          </div>

        </div>
      )}

    </article>
  );
}

export default InventoryCard;