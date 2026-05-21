import { useEffect, useState } from 'react';

import {
  Navigate
} from 'react-router-dom';

import supabase from '../../services/supabase';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } =
      await supabase.auth.getSession();

    if (data.session) {
      setAuthenticated(true);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div
        style={{
          color: 'white',
          padding: '40px'
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;