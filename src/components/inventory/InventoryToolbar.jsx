function InventoryToolbar() {
  return (
    <section className="inventory-toolbar-section">
      <h2 className="inventory-heading">
        Inventario
      </h2>

      <div className="inventory-toolbar">
        <input
          type="text"
          placeholder="Buscar por título o ITEM-XXX..."
          className="inventory-search"
        />

        <select className="inventory-filter">
          <option>Todos</option>
        </select>
      </div>
    </section>
  );
}

export default InventoryToolbar;