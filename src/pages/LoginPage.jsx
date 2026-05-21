import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';
import '../styles/pages/login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserSession();
  }, []);

  async function checkUserSession() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      alert('User already logged in.');
      // Later we will redirect to DashboardPage
    }

    setCheckingSession(false);
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate('/dashboard');
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  }

  async function handleSignup() {
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Check your email to confirm signup.');
  }

  if (checkingSession) {
    return (
      <div className="app">
        <h2>Checking session...</h2>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-layout">
        <div className="login-showcase">
          <div className="login-showcase-overlay"></div>

          <div className="login-showcase-content">
            <div className="login-badge">
              Sales Management App
            </div>

            <h1 className="login-showcase-title">
              Manage Your Business Beautifully Organized
            </h1>

            <p className="login-showcase-description">
              Track products, inventory, sales, and public storefronts
              from one powerful cloud-based dashboard.
            </p>

            <div className="login-showcase-dots">
              <span className="login-dot active"></span>
              <span className="login-dot"></span>
              <span className="login-dot"></span>
              <span className="login-dot"></span>
              <span className="login-dot"></span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-brand">
            <div className="login-logo">📦</div>
            <p className="login-app-name">
              Sales Management App
            </p>
          </div>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to continue managing your products,
            inventory, and sales.
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="password-actions">
            <span className="forgot-password-link">
              Forgot your password?
            </span>
          </div>

          <button
            className="btn-login"
            onClick={handleLogin}
          >
            Log In
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="btn-google"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <Link
            to="/signup"
            className="signup-link"
          >
            Create your free account
          </Link>

          <p className="security-text">
            🔒 Secure login powered by Supabase
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;