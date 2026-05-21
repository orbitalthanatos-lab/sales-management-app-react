import { useNavigate } from 'react-router-dom';

import supabase from '../services/supabase';

function DashboardPage() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();

    navigate('/login');
  }

  return (
    <div
      style={{
        padding: '40px',
        color: 'white',
        background: '#0f172a',
        minHeight: '100vh'
      }}
    >
      <h1>Dashboard</h1>

      <p>
        Welcome to the React version of the
        Sales Management App.
      </p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '12px 20px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;