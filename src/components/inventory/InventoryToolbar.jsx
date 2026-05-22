function InventoryToolbar({
  view,
  setView
}) {
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

        <div className="view-toggle">
          <button
            className={
              view === 'cards'
                ? 'nav-btn active'
                : 'nav-btn'
            }
            onClick={() => setView('cards')}
          >
            Cards
          </button>

          <button
            className={
              view === 'table'
                ? 'nav-btn active'
                : 'nav-btn'
            }
            onClick={() => setView('table')}
          >
            Table
          </button>
        </div>
      </div>
    </section>
  );
}

export default InventoryToolbar;