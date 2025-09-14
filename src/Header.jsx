const Header = ({ toggleMode }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#intro">Introduction</a></li>
          <li><a href="#cards">Trees</a></li>
        </ul>
      </nav>
      <button className="mode-toggle-btn" onClick={toggleMode}>
        Toggle Mode
      </button>
    </header>
  );
};

export default Header;
