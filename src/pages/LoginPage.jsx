import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';
import '../styles/pages/login.css';
import Notification from '../components/notifications/Notification.jsx';

// =====================================
// Login Page Component
// =====================================

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();
  const [notification, setNotification] =
    useState({
      visible: false,
      message: '',
      type: 'success'
    });

  function showNotification(message, type) {
    setNotification({
      visible: true,
      message,
      type
    });

    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        visible: false
      }));
    }, 3000);
  }

  useEffect(() => {
    checkUserSession();
  }, []);

  // =====================================
  // Ensure user profile exists after login
  // =====================================

  async function ensureUserProfile(user) {

    const { data: existingProfile } =
      await supabase
        .from('public_profiles')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

    if (existingProfile) {
      return;
    }

    const email =
      user.email || '';

    const emailPrefix =
      email
        .split('@')[0]
        ?.toLowerCase()
        ?.replace(/[^a-z0-9]/g, '');

    const slug =
      `${emailPrefix}-${Math.floor(Math.random() * 10000)}`;

    const metadata =
      user.user_metadata || {};

    const displayName =
      metadata.full_name ||
      metadata.name ||
      emailPrefix;

    const avatarUrl =
      metadata.avatar_url ||
      metadata.picture ||
      '';

    await supabase
      .from('public_profiles')
      .insert({

        user_id: user.id,

        email: email,

        public_slug: slug,

        store_name:
          `${displayName}'s Store`,

        display_name: displayName,

        avatar_url: avatarUrl,

        is_public: false,

        onboarding_completed: false

      });

  }

  // =====================================
  // Check if user is already logged in
  // =====================================

  async function checkUserSession() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {

      await ensureUserProfile(data.user);

      navigate('/dashboard');

      return;

    }

    setCheckingSession(false);
  }

  // =====================================
  // Handle login
  // =====================================

  async function handleLogin() {
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showNotification(error.message, 'error');
      return;
    }

    if (data.user) {
      await ensureUserProfile(data.user);
    }

    showNotification(
      'Login successful!',
      'success'
    );

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  }

  // =====================================
  // Handle Google OAuth login
  // =====================================

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  }

  // =====================================
  // Handle signup (for /signup page)
  // =====================================

  async function handleSignup() {
    if (!email || !password) {
      showNotification(
        'Please enter email and password.',
        'error'
      );
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      showNotification(error.message, 'error');
      return;
    }

    showNotification(
      'Check your email to confirm signup.',
      'success'
    );
  }

  if (checkingSession) {
    return (
      <div className="app">
        <h2>Checking session...</h2>
      </div>
    );
  }

  return (
    <>
      <Notification
        visible={notification.visible}
        message={notification.message}
        type={notification.type}
      />

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
    </>
  );
}

export default LoginPage;