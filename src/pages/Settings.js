import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Settings.css';

Modal.setAppElement('#root'); // Required for accessibility

function SettingsPage() {
    const [, setFileContent] = useState('');
    const [uploadedConfig, setUploadedConfig] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className='settings-page'>
            <div className="settings-container">
                <h1>Settings</h1>
                <div className="form-group">
                    <label htmlFor="formJson" className="custom-file-upload">
                        Choose File
                    </label>
                    <input
                        id="formJson"
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                    />
                    {uploadedConfig && (
                        <>
                            <button onClick={openModal} className='open-config-button'>
                                Open Configuration
                            </button>
                            <button onClick={handleDeleteConfig} className='delete-config-button'>
                                Delete Configuration
                            </button>
                        </>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <h2>Configuration</h2>
                    <pre>{JSON.stringify(uploadedConfig, null, 2)}</pre>
                    <button onClick={closeModal} className='close-button'>
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default SettingsPage;
