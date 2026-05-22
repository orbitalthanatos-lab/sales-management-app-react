import InventoryCard from './InventoryCard';

function InventoryGrid({
  items,
  view
}) {
  if (view === 'table') {
    return (
      <div className="table-placeholder">
        Table View Coming Next
      </div>
    );
  }

  return (
    <section className="cards-grid">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  );
}

export default InventoryGrid;