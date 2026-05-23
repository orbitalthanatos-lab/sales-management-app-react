import {
  useEffect,
  useRef,
  useState
} from 'react';

import { useNavigate } from 'react-router-dom';

import supabase from '../../services/supabase';

function UserMenu() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);

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

  async function handleLogout() {

    await supabase.auth.signOut();

    navigate('/login');

  }

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
          D
        </div>

        <span className="user-name">
          David
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