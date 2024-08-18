import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create this CSS file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`menu ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/settings" onClick={toggleMenu}>Settings</Link>
        </li>
        <li>
          <Link to="/quizform" onClick={toggleMenu}>Quiz Form</Link>
        </li>
        <li>
          <Link to="/qrscan" onClick={toggleMenu}>QR Scan</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;