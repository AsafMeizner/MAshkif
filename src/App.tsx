import React, { useEffect, useState } from 'react';
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
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem('preferences');
      if (storedPreferences) {
        const preferences = JSON.parse(storedPreferences);
        if (preferences.autoUpdate !== undefined) {
          setAutoUpdateEnabled(preferences.autoUpdate);
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  }, []);

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
    // Only set up the interval if auto update is enabled
    if (!autoUpdateEnabled) {
      return;
    }

    const intervalId = setInterval(() => {
      if (navigator.onLine) {
        const password = getPasswordFromLocalStorage();
        if (!password) {
          toast.error('Password not found in local storage for auto-update.');
          return;
        }
        
        // Create pending toast that auto-closes after 1 second
        toast.info('Auto-updating local entries...', {
          autoClose: 2000
        });
        
        // Handle the update operation separately
        updateScoutingDataFromAPI(password)
          .then(() => {
            toast.success('Local entries updated automatically.');
          })
          .catch((error) => {
            const lowerMsg = error.message.toLowerCase();
            const prefix = "Failed to auto-update data:";
            let errorMessage;
            
            if (lowerMsg.includes("403") || (lowerMsg.includes("forbidden") && lowerMsg.includes("invalid password"))) {
              errorMessage = `${prefix} Incorrect Password`;
            } else if (lowerMsg.includes("failed to fetch")) {
              errorMessage = `${prefix} Incorrect Server URL`;
            } else {
              errorMessage = `${prefix} ${error.message}`;
            }
            
            toast.error(errorMessage);
          });
      }
    }, 180000); // 180,000 ms = 3 minutes

    return () => clearInterval(intervalId);
  }, [autoUpdateEnabled]); // Add autoUpdateEnabled as a dependency

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
