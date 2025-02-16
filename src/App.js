import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizForm from './pages/QuizForm';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import QrScan from './pages/QrScan';
import Navbar from './components/Navbar';
import Visualization from './pages/Visualization';
import UpdateEntriesPage from './pages/UpdateEntriesPage';
import PrincessForm from './pages/PrincessForm';
import { ToastContainer } from 'react-toastify';

function App() {

  // Function to initialize localStorage values
  useEffect(() => {
    const initializeLocalStorage = () => {
      if (!localStorage.getItem('scouting_data')) {
        localStorage.setItem('scouting_data', JSON.stringify({}));
      }

      if (!localStorage.getItem('princess_data')) {
        localStorage.setItem('princess_data', JSON.stringify({}));
      }

      if (!localStorage.getItem('password')) {
        localStorage.setItem('password', ''); 
      }

      if (!localStorage.getItem('submissions')) {
        localStorage.setItem('submissions', JSON.stringify([])); 
      }

      if (!localStorage.getItem('princessSubmissions')) {
        localStorage.setItem('princessSubmissions', JSON.stringify({})); 
      }

      if (!localStorage.getItem('scouting_data_url')) {
        localStorage.setItem('scouting_data_url', '');
      }
    };

    // Call the function to initialize localStorage
    initializeLocalStorage();
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <Routes>
          <Route path="/quizform" element={<QuizForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/qrscan" element={<QrScan />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/update-entries" element={<UpdateEntriesPage />} /> 
          <Route path="/princessform" element={<PrincessForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;