import React from 'react';
import Modal from 'react-modal';
import './HomePage.css';

Modal.setAppElement('#root');

function HomePage() {
    return (
        <div className="home-page">
            <header className="home-header">
                <h1 className="home-title">Mashkif</h1>
                <img src="/icon.png" alt="App Icon" className="home-logo" />
            </header>
            <p className="home-description">This is the scouting app made by Makers Assemble 5951</p>
            <div className="button-container">
                <button onClick={() => window.location.href = '/quizform'} className="home-button">Scouting Form</button>
                <button onClick={() => window.location.href = '/settings'} className="home-button">Setup</button>
                <button onClick={() => window.location.href = '/qrscan'} className="home-button">Scan QR</button>
            </div>
        </div>
    );
}

export default HomePage;
