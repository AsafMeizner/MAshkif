import React, { useState, useEffect } from 'react';
import './UpdateEntriesPage.css'; // Use CSS Modules to ensure scoped styles
import { updateScoutingDataFromAPI, postAllSubmissions } from '../components/utils';

const UpdateEntriesPage = () => {
  const [password, setPassword] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUpdateStatus('');
    setUploadStatus('');
  }, []);

  const handleUpdateData = async () => {
    if (!password) {
      setUpdateStatus('Please enter a password.');
      return;
    }
    setIsLoading(true);
    setUpdateStatus('Updating data...');
    try {
      await updateScoutingDataFromAPI(password); // Pass the password to the API function
      setUpdateStatus('Data updated successfully.');
    } catch (error) {
      setUpdateStatus('Failed to update data.');
    } finally {
      setIsLoading(false);
      console.log('Data update completed.');
      console.log('data: ', localStorage.getItem('scouting_data_dcmp'));
    }
  };

  const handleUploadSubmissions = async () => {
    if (!password) {
      setUploadStatus('Please enter a password.');
      return;
    }
  
    setIsLoading(true);
    setUploadStatus('Uploading submissions...');
    try {
      await postAllSubmissions(password); // Pass both the URL and password
      setUploadStatus('Submissions uploaded successfully.');
    } catch (error) {
      setUploadStatus('Failed to upload submissions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-entries-page">
      <div className="update-entries-container">
        <h1 className="update-entries-title">Manage Data</h1>

        {/* Password input */}
        <label htmlFor="password" className="update-entries-password-label">Password</label>
        <input
          type="password"
          id="password"
          className="update-entries-password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {/* Update Local Entries */}
        <button 
          className="update-entries-button" 
          onClick={handleUpdateData} 
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Local Entries'}
        </button>
        {updateStatus && <p className="update-entries-status-message">{updateStatus}</p>}

        {/* Upload Submissions */}
        <button 
          className="update-entries-button" 
          onClick={handleUploadSubmissions} 
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Submissions'}
        </button>
        {uploadStatus && <p className="update-entries-status-message">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default UpdateEntriesPage;
