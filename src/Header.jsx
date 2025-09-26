import { Link } from "react-router-dom";

const Header = ({ toggleMode }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-profile">Add Profile</Link></li>
          <li><Link to="/other-profiles">Other Profiles</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <button className="mode-toggle-btn" onClick={toggleMode}>
        Toggle Mode
      </button>
    </header>
  );
};

export default Header;
