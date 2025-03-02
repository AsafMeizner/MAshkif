// src/globalUpdateHandlers.js
import {
    getPasswordFromLocalStorage,
    updateScoutingDataFromAPI,
    postAllSubmissions
} from './components/utils';

export const getFriendlyErrorMessage = (errorMessage, operationType) => {
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

export async function updateLocalEntries() {
    const password = getPasswordFromLocalStorage();
    if (!password) {
        new Notification("MAshkif", { body: "Password not found in local storage.", icon: 'favicon.ico' });
        return;
    }
    new Notification("MAshkif", { body: "Updating data...", icon: 'favicon.ico' });
    try {
        await updateScoutingDataFromAPI(password);
        const notif = new Notification("MAshkif", { body: "Data updated successfully.", icon: 'favicon.ico' });
        notif.onclick = () => {
            // Navigate to /visualization when the notification is clicked.
            window.location.hash = '#/visualization';
        };
    } catch (error) {
        new Notification("MAshkif", { body: getFriendlyErrorMessage(error.message, "update"), icon: 'favicon.ico' });
        throw error;
    }
}

export async function uploadSubmissions() {
    const password = getPasswordFromLocalStorage();
    if (!password) {
        new Notification("MAshkif", { body: "Password not found in local storage.", icon: 'favicon.ico' });
        return;
    }
    new Notification("MAshkif", { body: "Uploading submissions...", icon: 'favicon.ico' });
    try {
        await postAllSubmissions(password);
        const notif = new Notification("MAshkif", { body: "Submissions uploaded successfully.", icon: 'favicon.ico' });
        notif.onclick = () => {
            window.location.hash = '#/visualization';
        };
    } catch (error) {
        new Notification("MAshkif", { body: getFriendlyErrorMessage(error.message, "upload"), icon: 'favicon.ico' });
        throw error;
    }
}
