import React, { useState, useEffect } from 'react';
import './UpdateEntriesPage.css';
import {
  updateScoutingDataFromAPI,
  postAllSubmissions,
  getPasswordFromLocalStorage
} from '../components/utils';
import { toast } from 'react-toastify';
import HapticFeedback from '../components/HapticFeedback';

const getFriendlyErrorMessage = (errorMessage, operationType) => {
  const lowerMsg = errorMessage.toLowerCase();
  const prefix = operationType === "update" ? "Failed to update data:" : "Failed to upload:";

  if (lowerMsg.includes("403") || (lowerMsg.includes("forbidden") && lowerMsg.includes("invalid password"))) {
    return `${prefix} Incorrect Password`;
  }
  if (lowerMsg.includes("failed to fetch")) {
    return `${prefix} Incorrect Server URL`;
  }
  return `${prefix} ${errorMessage}`;
};

const UpdateEntriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [triggerHaptic, setTriggerHaptic] = useState(false);

  // Reset haptic feedback state after it's triggered
  useEffect(() => {
    if (triggerHaptic) {
      const timer = setTimeout(() => {
        setTriggerHaptic(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerHaptic]);

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
              return getFriendlyErrorMessage(data.message, "update");
            }
          }
        }
      );
      console.log('Data update completed.');
      console.log('data:', localStorage.getItem('scouting_data'));
      setTriggerHaptic(true); 
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
      setTriggerHaptic(true); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-entries-page">
      {triggerHaptic && <HapticFeedback />}
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