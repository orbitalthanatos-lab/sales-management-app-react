import supabase from './services/supabase';
import './App.css';

function App() {
  console.log('Supabase client loaded:', supabase);

  return (
    <div className="app">
      <h1>Sales Management App (React Version)</h1>
      <p>Supabase has been loaded successfully.</p>
    </div>
  );
}

export default App;