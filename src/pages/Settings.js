import React, { useState } from 'react';
import Modal from 'react-modal';
import './Settings.css';

Modal.setAppElement('#root');

function SettingsPage() {
    const [settingsData, setSettingsData] = useState({ dbURI: '', formJson: '' });

    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('dburi', settingsData.dbURI);
        localStorage.setItem('questionlist', settingsData.formJson);
    }

    function handleFileUpload(e) {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target?.result;
                setSettingsData(prevState => ({ ...prevState, formJson: fileContent }));
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid JSON file.');
        }
    }

    return (
        <div>
            <div className="settings-page">
                <h1>Settings</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="dbURI">Database URI</label>
                        <input
                            id="dbURI"
                            type="text"
                            value={settingsData.dbURI}
                            onChange={(e) => setSettingsData(prevState => ({ ...prevState, dbURI: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formJson">Upload JSON File</label>
                        <input
                            id="formJson"
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
            <div style={{ height: '100vh' }}></div>
        </div>
    );
}

export default SettingsPage;