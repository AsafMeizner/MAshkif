import React, { useState } from 'react';
import './UpdateEntriesPage.css';
import { updateScoutingDataFromAPI, postAllSubmissions, getPasswordFromLocalStorage } from '../components/utils';
import { toast } from 'react-toastify';

const UpdateEntriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateData = async () => {
    const password = getPasswordFromLocalStorage();
    if (!password) {
      toast.error('Password not found in local storage.');
      return;
    }
    setIsLoading(true);
    try {
      await toast.promise(
        updateScoutingDataFromAPI(password),
        {
          pending: 'Updating data...',
          success: 'Data updated successfully.',
          error: 'Failed to update data.'
        }
      );
      console.log('Data update completed.');
      console.log('data: ', localStorage.getItem('scouting_data'));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSubmissions = async () => {
    const password = getPasswordFromLocalStorage();
    if (!password) {
      toast.error('Password not found in local storage.');
      return;
    }
    setIsLoading(true);
    try {
      await toast.promise(
        postAllSubmissions(password),
        {
          pending: 'Uploading submissions...',
          success: 'Submissions uploaded successfully.',
          error: 'Failed to upload submissions.'
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-entries-page">
      <div className="update-entries-container">
        <h1 className="update-entries-title">Manage Data</h1>

        <button 
          className="update-entries-button" 
          onClick={handleUpdateData} 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Update Local Entries'}
        </button>

        <button 
          className="update-entries-button" 
          onClick={handleUploadSubmissions} 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Upload Submissions'}
        </button>
      </div>
    </div>
  );
};

export default UpdateEntriesPage;