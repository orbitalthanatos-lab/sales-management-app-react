import InventoryCard from './InventoryCard';

function InventoryGrid({ items }) {
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