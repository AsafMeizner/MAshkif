import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create this CSS file

window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transition = "transform 0.3s ease-in-out";
    navbar.style.transform = "translateY(0)";
  }
});

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
          <Link to="/princessform" onClick={toggleMenu}>Princess Form</Link>
        </li>
        <li>
          <Link to="/qrscan" onClick={toggleMenu}>QR Scan</Link>
        </li>
        <li>
          <Link to="/update-entries" onClick={toggleMenu}>Update Entries</Link>
        </li>
        <li>
          <Link to="/visualization" onClick={toggleMenu}>Visualization</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;