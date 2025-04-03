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
    const [competitionId, setCompetitionId] = useState('');
    const [savedCompetitionId, setSavedCompetitionId] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFetchingTeams, setIsFetchingTeams] = useState(false);

    useEffect(() => {
        // Load API URL if exists
        const storedApiUrl = localStorage.getItem('api_url');
        if (storedApiUrl) {
            setSavedApiUrl(storedApiUrl);
            setApiUrl(storedApiUrl);
        }
        // Load competition id if exists
        const storedCompetitionId = localStorage.getItem('competition_id');
        if (storedCompetitionId) {
            setSavedCompetitionId(storedCompetitionId);
            setCompetitionId(storedCompetitionId);
        }
        // Load password if exists, using key "password"
        const storedPassword = localStorage.getItem('password');
        if (storedPassword) {
            setSavedPassword(storedPassword);
            setPassword(storedPassword);
        }
    }, []);

    // Function to fetch teams from API
    const fetchTeams = async () => {
        const apiUrl = localStorage.getItem('api_url');
        const competitionId = localStorage.getItem('competition_id');
        const password = localStorage.getItem('password');
        
        if (!apiUrl || !competitionId) {
            console.error('API URL or Competition ID not found in localStorage');
            return false;
        }

        if (!password) {
            console.error('Password not found in localStorage');
            return false;
        }

        // Check if we already have teams in localStorage
        const existingTeams = localStorage.getItem('teams_list');
        if (existingTeams) {
            try {
                const teams = JSON.parse(existingTeams);
                if (Array.isArray(teams) && teams.length > 0) {
                    console.log('Teams already available in localStorage, fetching in background');
                    // Still fetch in background to update if needed, but don't show loading state
                    fetchTeamsInBackground();
                    return true;
                }
            } catch (error) {
                console.error('Error parsing existing teams:', error);
            }
        }

        // If we don't have teams in localStorage, show loading state
        setIsFetchingTeams(true);
        return await fetchTeamsInBackground();
    };

    // Helper function to fetch teams in the background
    const fetchTeamsInBackground = async () => {
        const apiUrl = localStorage.getItem('api_url');
        const competitionId = localStorage.getItem('competition_id');
        const password = localStorage.getItem('password');
        
        try {
            const endpoint = `${apiUrl}${competitionId}/teams`;
            console.log(`Fetching teams from: ${endpoint}`);
            
            // Set a timeout to prevent the request from hanging indefinitely
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch(endpoint, {
                headers: {
                    'x-password': password
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const teams = await response.json();
            
            if (Array.isArray(teams)) {
                localStorage.setItem('teams_list', JSON.stringify(teams));
                console.log('Teams fetched and stored successfully');
                
                // Only show success toast if we were showing loading state
                if (isFetchingTeams) {
                    toast.success('Teams list updated successfully');
                }
                return true;
            } else {
                console.error('API response is not an array');
                if (isFetchingTeams) {
                    toast.error('Failed to load teams from API');
                }
                return false;
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timed out');
                if (isFetchingTeams) {
                    toast.error('Request timed out. Please check your internet connection.');
                }
            } else {
                console.error(`Error fetching teams from API: ${error.message}`);
                if (isFetchingTeams) {
                    toast.error(`Failed to load teams: ${error.message}`);
                }
            }
            return false;
        } finally {
            setIsFetchingTeams(false);
        }
    };

    function handleSaveApiUrl() {
        if (apiUrl) {
            const returned = saveAPIURLToLocalStorage(apiUrl);
            if (returned[0]) {
                toast.success(returned[1]);
                setSavedApiUrl(apiUrl);
                
                // If competition ID is already set, fetch teams in the background
                if (savedCompetitionId) {
                    // Don't await the fetch, let it run in the background
                    fetchTeams().catch(error => {
                        console.error('Background teams fetch failed:', error);
                    });
                }
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

    async function handleSaveCompetitionId() {
        if (competitionId) {
            localStorage.setItem('competition_id', competitionId);
            toast.success('Competition ID saved successfully.');
            setSavedCompetitionId(competitionId);
            
            // Fetch teams in the background
            fetchTeams().catch(error => {
                console.error('Background teams fetch failed:', error);
            });
        } else {
            toast.error('Please enter a valid Competition ID.');
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

                {/* Competition ID input and save button */}
                <div className="simple-text-section">
                    <label htmlFor="competitionId">Competition ID:</label>
                    <input
                        type="text"
                        id="competitionId"
                        value={competitionId}
                        onChange={(e) => setCompetitionId(e.target.value)}
                        placeholder="Enter Competition ID"
                    />
                    <button 
                        onClick={handleSaveCompetitionId} 
                        className="simple-save-button"
                        disabled={isFetchingTeams}
                    >
                        {isFetchingTeams ? 'Saving & Fetching Teams...' : 'Save Competition ID'}
                    </button>
                    {savedCompetitionId && (
                        <p>Saved Competition ID: {savedCompetitionId}</p>
                    )}
                </div>

                {/* Password input and save button */}
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