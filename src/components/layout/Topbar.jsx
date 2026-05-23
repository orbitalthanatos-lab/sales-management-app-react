import '../../styles/main.css';

import UserMenu from './UserMenu';

function Topbar() {

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <div className="topbar-logo">
            Sales Management App
          </div>

          <nav className="topbar-nav">
            <button className="nav-btn active">
              Inventory
            </button>

            <button className="nav-btn">
              Dashboard
            </button>

            <button className="nav-btn">
              Account
            </button>
          </nav>
        </div>

        <div className="topbar-right">
          <button className="nav-btn">
            Import
          </button>

          <button className="nav-btn">
            Prompt
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default Topbar;