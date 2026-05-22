function InventoryTable({ items }) {
  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Image</th>

            <th>Product</th>

            <th>Price</th>

            <th>Profit</th>

            <th>Status</th>

            <th>Platforms</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="table-image-cell">
                <img
                  src={item.image}
                  alt={item.title}
                  className="table-image"
                />
              </td>

              <td>
                <div className="table-product">
                  <span className="table-title">
                    {item.title}
                  </span>

                  <span className="table-id">
                    ITEM-{item.id}
                  </span>
                </div>
              </td>

              <td className="table-price">
                {item.price}
              </td>

              <td className="table-profit">
                50.00 €
              </td>

              <td>
                <span className="table-status">
                  {item.status}
                </span>
              </td>

              <td>
                <div className="platform-icons">
                  <span>🛒</span>
                  <span>📦</span>
                </div>
              </td>

              <td>
                <div className="table-actions">
                  <button>✏️</button>
                  <button>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;