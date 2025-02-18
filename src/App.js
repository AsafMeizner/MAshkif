import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
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
  // Detect if we're running inside Electron
  const isElectron = navigator.userAgent.toLowerCase().indexOf('electron') > -1;
  const RouterComponent = isElectron ? HashRouter : BrowserRouter;

  // Initialize localStorage values
  useEffect(() => {
    let didFix = false;
    const keysAndDefaults = {
      // scouting_data: {},
      // princess_data: {},
      password: '',
      submissions: [],
      princessSubmissions: [],
      scouting_data_url: ''
    };

    Object.entries(keysAndDefaults).forEach(([key, defaultValue]) => {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
          localStorage.setItem(key, JSON.stringify(defaultValue));
          didFix = true;
        } else {
          if (typeof defaultValue === 'object') {
            let parsedValue = JSON.parse(storedValue);
            if (Array.isArray(defaultValue)) {
              if (!Array.isArray(parsedValue)) {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                didFix = true;
              }
            } else {
              if (typeof parsedValue !== 'object' || Array.isArray(parsedValue)) {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                didFix = true;
              }
            }
          } else {
            let parsedValue;
            try {
              parsedValue = JSON.parse(storedValue);
            } catch {
              parsedValue = storedValue;
            }
            if (typeof parsedValue !== typeof defaultValue) {
              localStorage.setItem(key, JSON.stringify(defaultValue));
              didFix = true;
            }
          }
        }
      } catch (error) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        didFix = true;
      }
    });

    if (didFix && !sessionStorage.getItem('localStorageFixed')) {
      sessionStorage.setItem('localStorageFixed', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <RouterComponent>
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
    </RouterComponent>
  );
}

export default App;
