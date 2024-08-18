import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizForm from './pages/QuizForm';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import QrScan from './pages/QrScan';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{marginTop: "5%"}}>
          <Routes>
            <Route path="/quizform" element={<QuizForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/qrscan" element={<QrScan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;