import { useEffect, useState } from 'react';

import { processImportText } from '../services/import.service';

import supabase from '../services/supabase';
import Topbar from '../components/layout/Topbar';

import StatsCards from '../components/inventory/StatsCards';
import InventoryToolbar from '../components/inventory/InventoryToolbar';
import InventoryGrid from '../components/inventory/InventoryGrid';


import '../styles/main.css';

function InventoryPage() {

  const [importText, setImportText] =
    useState('');

  const [importLoading, setImportLoading] =
    useState(false);

  const [view, setView] =
    useState('cards');

  const [items, setItems] =
    useState([]);

  // =====================================
  // Handle Import Logic
  // =====================================

  async function handleImport() {

    if (!importText.trim()) {
      return;
    }

    try {

      setImportLoading(true);

      await processImportText(
        importText
      );

      await fetchItems();

      alert('Item imported successfully');

      setImportText('');

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setImportLoading(false);

    }

  }

  // =====================================
  // Fetch items on mount
  // =====================================

  async function fetchItems() {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const {
      data,
      error
    } = await supabase
      .from('items')
      .select(`
      *,
      item_platforms (*)
    `)
      .eq('user_id', user.id)
      .order('created_at', {
        ascending: false
      });

    if (error) {
      console.error(error);
      return;
    }

    const formattedItems =
      data.map((item) => {

        const firstPlatform =
          item.item_platforms?.[0];

        return {

          id: item.id,

          title:
            firstPlatform?.title ||
            'Untitled Item',

          price:
            `${firstPlatform?.price || 0} €`,

          status:
            item.status || 'available',

          image:
            'https://placehold.co/600x600'

        };

      });

    setItems(formattedItems);

  }

  useEffect(() => {

    fetchItems();

  }, []);

  return (
    <>
      <Topbar />

      <main className="container">
        <StatsCards />

        <div className="import-box">

          <textarea
            value={importText}
            onChange={(e) =>
              setImportText(e.target.value)
            }
            placeholder="Paste MASTER PROMPT text here..."
            rows={12}
          />

          <button
            onClick={handleImport}
            disabled={importLoading}
          >

            {importLoading
              ? 'Importing...'
              : 'Import Item'}

          </button>

        </div>

        <InventoryToolbar
          view={view}
          setView={setView}
        />

        <InventoryGrid
          items={items}
          view={view}
        />
      </main>
    </>
  );
}

export default InventoryPage;