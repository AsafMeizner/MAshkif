import React, { useState, useEffect } from 'react';
import './Settings.css';

function SettingsPage() {
    const [, setFileContent] = useState('');
    const [uploadedConfig, setUploadedConfig] = useState(null);

    useEffect(() => {
        const savedConfig = localStorage.getItem('config');
        if (savedConfig) {
            setUploadedConfig(JSON.parse(savedConfig));
        }
    }, []);

    function handleFileUpload(e) {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result;
                setFileContent(content);
                localStorage.setItem('config', content || '');
                setUploadedConfig(JSON.parse(content || '{}'));
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid JSON file.');
        }
    }

    function handleDeleteConfig() {
        localStorage.removeItem('config');
        setUploadedConfig(null);
    }

    return (
        <div>
            <div className="settings-page">
                <h1>Settings</h1>
                <div className="form-group">
                    <label htmlFor="formJson">Upload Configuration JSON</label>
                    <input
                        id="formJson"
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                    />
                </div>
                {uploadedConfig && (
                    <div className="uploaded-config">
                        <h2>Current Configuration</h2>
                        <pre>{JSON.stringify(uploadedConfig, null, 2)}</pre>
                        <button onClick={handleDeleteConfig} className='delete-button'>Delete Configuration</button>
                    </div>
                )}
            </div>
            <div style={{height: '100vh'}}></div>
        </div>
    );
}

export default SettingsPage;