function StatsCards() {
  return (
    <section className="stats-grid">
      <div className="stats-card">
        <span className="stats-label">
          📦 ARTÍCULOS
        </span>

        <h2 className="stats-value">
          9
        </h2>
      </div>

      <div className="stats-card">
        <span className="stats-label">
          ✅ VENDIDOS
        </span>

        <h2 className="stats-value">
          1
        </h2>
      </div>

      <div className="stats-card">
        <span className="stats-label">
          💰 BENEFICIO TOTAL
        </span>

        <h2 className="stats-value profit">
          50.00 €
        </h2>
      </div>

      <div className="stats-card">
        <span className="stats-label">
          📈 BENEFICIO POTENCIAL
        </span>

        <h2 className="stats-value profit">
          484.00 €
        </h2>
      </div>
    </section>
  );
}

export default StatsCards;