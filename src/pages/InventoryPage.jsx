import { useState } from 'react';

import Topbar from '../components/layout/Topbar';

import StatsCards from '../components/inventory/StatsCards';
import InventoryToolbar from '../components/inventory/InventoryToolbar';
import InventoryGrid from '../components/inventory/InventoryGrid';

import '../styles/main.css';

function InventoryPage() {
  const [items] = useState([
    {
      id: 1,
      title: 'Chaqueta bomber negra hombre',
      price: '65.00 €',
      status: 'Disponible',
      image:
        'https://placehold.co/600x600'
    },

    {
      id: 2,
      title: 'Parca camuflaje Woodland',
      price: '130.00 €',
      status: 'Disponible',
      image:
        'https://placehold.co/600x600'
    },

    {
      id: 3,
      title: 'Half Dollar Kennedy Roll',
      price: '100.00 €',
      status: 'Vendido',
      image:
        'https://placehold.co/600x600'
    },

    {
      id: 4,
      title: 'Cuna blanca bebé',
      price: '80.00 €',
      status: 'Disponible',
      image:
        'https://placehold.co/600x600'
    }
  ]);

  return (
    <>
      <Topbar />

      <main className="container">
        <StatsCards />

        <InventoryToolbar />

        <InventoryGrid items={items} />
      </main>
    </>
  );
}

export default InventoryPage;