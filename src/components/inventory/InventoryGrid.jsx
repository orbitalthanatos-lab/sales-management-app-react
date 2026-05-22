import InventoryCard from './InventoryCard';
import InventoryTable from './InventoryTable';

function InventoryGrid({
  items,
  view
}) {
  if (view === 'table') {
    return (
      <InventoryTable items={items} />
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