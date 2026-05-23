import {
  useEffect,
  useRef,
  useState
} from 'react';

import { useNavigate } from 'react-router-dom';

import supabase from '../../services/supabase';

// =====================================
// User Menu Component
// =====================================

function UserMenu() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profile, setProfile] =
    useState(null);

  const navigate = useNavigate();

  const menuRef = useRef(null);

  // =====================================
  // Close menu when clicking outside
  // =====================================

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };

  }, []);

  // =====================================
  // Load user profile on mount
  // =====================================

  useEffect(() => {

    async function loadProfile() {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data } =
        await supabase
          .from('public_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

      setProfile(data);

    }

    loadProfile();

  }, []);

  // =====================================
  // Check user session on mount
  // =====================================

  async function handleLogout() {

    await supabase.auth.signOut();

    navigate('/login');

  }

  // =====================================
  // Render user menu
  // =====================================

  return (

    <div
      className="user-menu"
      ref={menuRef}
    >

      <button
        className="user-menu-button"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        <div className="user-avatar">

          {profile?.avatar_url ? (

            <img
              src={profile.avatar_url}
              alt={profile.display_name}
              className="user-avatar-image"
              referrerPolicy="no-referrer"
            />

          ) : (

            profile?.display_name
              ?.charAt(0)
              ?.toUpperCase() || 'U'

          )}

        </div>

        <span className="user-name">

          {profile?.display_name || 'User'}

        </span>

      </button>

      {menuOpen && (

        <div className="user-dropdown">

          <button className="user-dropdown-item">
            My Account
          </button>

          <button
            className="user-dropdown-item logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
}

export default UserMenu;