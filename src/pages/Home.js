import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './HomePage.css';
import icon from '../assets/icon.png'; // adjust the path if needed

Modal.setAppElement('#root');

function HomePage() {
  return (
    <div style={window.innerWidth > 1000 ? { overflow: "hidden", height: "100vh", width: "100vw" } : {}}>
      <div className="home-page" style={{ marginTop: "5%" }}>
        <header className="home-header">
          <h1 className="home-title">MAshkif</h1>
          <img src={icon} alt="App Icon" className="home-logo" />
        </header>
        <p className="home-description">This is the scouting app made by Makers Assemble 5951</p>
        <div className="button-container">
          <Link to="/quizform" className="home-button">Scouting Form</Link>
          <Link to="/settings" className="home-button">Setup</Link>
          <Link to="/qrscan" className="home-button">Scan QR</Link>
          <Link to="/update-entries" className="home-button">Update Data</Link>
          <Link to="/visualization" className="home-button">Visualization</Link>
          <Link to="/princessform" className="home-button">Princess Form</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
