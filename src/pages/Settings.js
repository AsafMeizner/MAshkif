import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Settings.css';
import { saveAPIURLToLocalStorage, savePasswordToLocalStorage } from '../components/utils';
import { toast } from 'react-toastify';

Modal.setAppElement('#root'); // Required for accessibility

function SettingsPage() {
    const [apiUrl, setApiUrl] = useState('');
    const [savedApiUrl, setSavedApiUrl] = useState('');
    const [password, setPassword] = useState('');
    const [savedPassword, setSavedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // new state

    useEffect(() => {
        const storedApiUrl = localStorage.getItem('scouting_data_url');
        if (storedApiUrl) {
            setSavedApiUrl(storedApiUrl);
            setApiUrl(storedApiUrl);
        }

        const storedPassword = localStorage.getItem('password');
        if (storedPassword) {
            setSavedPassword(storedPassword);
            setPassword(storedPassword);
        }
    }, []);

    function handleSaveApiUrl() {
        if (apiUrl) {
            const returned = saveAPIURLToLocalStorage(apiUrl);
            if (returned[0]) {
                toast.success(returned[1]);
                setSavedApiUrl(apiUrl);
            } else {
                toast.error(returned[1]);
            }
        } else {
            toast.error('Please enter a valid API URL.');
        }
    }

    function handleSavePassword() {
        if (password) {
            const returned = savePasswordToLocalStorage(password);
            if (returned[0]) {
                toast.success(returned[1]);
                setSavedPassword(password);
            } else {
                toast.error(returned[1]);
            }
        } else {
            toast.error('Please enter a valid password.');
        }
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className='settings-page'>
            <div className="settings-container">
                <h1>Settings</h1>
                {/* API URL input and save button */}
                <div className="simple-text-section">
                    <label htmlFor="apiUrl">API URL:</label>
                    <input
                        type="text"
                        id="apiUrl"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        placeholder="Enter API URL"
                    />
                    <button onClick={handleSaveApiUrl} className="simple-save-button">
                        Save API URL
                    </button>
                    {savedApiUrl && (
                        <p>Saved API URL: {savedApiUrl}</p>
                    )}
                </div>

                {/* password input and save button */}
                <div className="simple-text-section">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        <button 
                            type="button" 
                            onClick={toggleShowPassword} 
                            className="toggle-password-button"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button onClick={handleSavePassword} className="simple-save-button">
                        Save Password
                    </button>
                    {savedPassword && (
                        <p>Password saved</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;