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
import { ToastContainer, toast } from 'react-toastify';
import { updateScoutingDataFromAPI, getPasswordFromLocalStorage } from './components/utils';

function App() {
  const isElectron = navigator.userAgent.toLowerCase().indexOf('electron') > -1;
  const RouterComponent = isElectron ? HashRouter : BrowserRouter;

  // Existing localStorage fixup
  useEffect(() => {
    let didFix = false;
    const keysAndDefaults = {
      submissions: [],
      princessSubmissions: [],
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

  // New background updater: every 3 minutes, if online, run update local entries.
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (navigator.onLine) {
        const password = getPasswordFromLocalStorage();
        if (!password) {
          toast.error('Password not found in local storage for auto-update.');
          return;
        }
        toast.promise(
          updateScoutingDataFromAPI(password),
          {
            pending: 'Auto-updating local entries...',
            success: 'Local entries updated automatically.',
            error: {
              render({ data }) {
                const lowerMsg = data.message.toLowerCase();
                const prefix = "Failed to auto-update data:";
                if (lowerMsg.includes("403") || (lowerMsg.includes("forbidden") && lowerMsg.includes("invalid password"))) {
                  return `${prefix} Incorrect Password`;
                }
                if (lowerMsg.includes("failed to fetch")) {
                  return `${prefix} Incorrect Server URL`;
                }
                return `${prefix} ${data.message}`;
              }
            }
          }
        );
      }
    }, 180000); // 180,000 ms = 3 minutes

    return () => clearInterval(intervalId);
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
