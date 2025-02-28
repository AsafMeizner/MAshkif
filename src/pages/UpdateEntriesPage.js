import React, { useState } from 'react';
import './UpdateEntriesPage.css';
import {
  updateScoutingDataFromAPI,
  postAllSubmissions,
  getPasswordFromLocalStorage
} from '../components/utils';
import { toast } from 'react-toastify';

// Helper function to produce a friendly error message.
const getFriendlyErrorMessage = (errorMessage, operationType) => {
  const lowerMsg = errorMessage.toLowerCase();
  // Choose a prefix based on the operation type.
  const prefix =
    operationType === "update" ? "Failed to update data:" : "Failed to upload:";
  // If the error indicates a 403 or forbidden password error, assume it's a password issue.
  if (lowerMsg.includes("403") || (lowerMsg.includes("forbidden") && lowerMsg.includes("invalid password"))) {
    return `${prefix} Incorrect Password`;
  }
  // If it says "failed to fetch," assume it's a server URL issue.
  if (lowerMsg.includes("failed to fetch")) {
    return `${prefix} Incorrect Server URL`;
  }
  // Otherwise, return the original message.
  return `${prefix} ${errorMessage}`;
};

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
          error: {
            render({ data }) {
              // data.message is the error thrown from updateScoutingDataFromAPI
              return getFriendlyErrorMessage(data.message, "update");
            }
          }
        }
      );
      console.log('Data update completed.');
      console.log('data:', localStorage.getItem('scouting_data'));
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
          error: {
            render({ data }) {
              return getFriendlyErrorMessage(data.message, "upload");
            }
          }
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
