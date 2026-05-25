import { useState } from 'react';

function InventoryCard({ item }) {

  const [expanded, setExpanded] =
    useState(false);

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  return (
    <article className="inventory-card">

      <div className="inventory-card-image-wrapper">

        <img
          src={
            item.images?.[currentImageIndex]
            || item.image
          }
          alt={item.title}
          className="inventory-card-image"
        />

        <div className="inventory-card-overlay"></div>

        {
          item.images?.length > 1 && (

            <>

              <button
                className="carousel-btn carousel-btn-left"
                onClick={() => {

                  setCurrentImageIndex(
                    (prev) =>

                      prev === 0
                        ? item.images.length - 1
                        : prev - 1
                  );

                }}
              >
                ‹
              </button>

              <button
                className="carousel-btn carousel-btn-right"
                onClick={() => {

                  setCurrentImageIndex(
                    (prev) =>

                      prev === item.images.length - 1
                        ? 0
                        : prev + 1
                  );

                }}
              >
                ›
              </button>

              <div className="carousel-dots">

                {
                  item.images.map((_, index) => (

                    <button
                      key={index}
                      className={
                        index === currentImageIndex
                          ? 'carousel-dot active'
                          : 'carousel-dot'
                      }
                      onClick={() =>
                        setCurrentImageIndex(index)
                      }
                    />

                  ))
                }

              </div>

            </>

          )
        }
        
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

            <span>
              {item.buy}
            </span>
          </div>

          <div className="inventory-card-detail">
            <strong>Comisión</strong>

            <span>
              {item.fees}
            </span>
          </div>

          <div className="inventory-card-detail">
            <strong>Beneficio</strong>

            <span className="profit-text">
              {item.profit}
            </span>
          </div>

          <div className="inventory-card-detail">
            <strong>Descripción</strong>

            <p>
              {item.description}
            </p>
          </div>

        </div>
      )}

    </article>
  );
}

export default InventoryCard;