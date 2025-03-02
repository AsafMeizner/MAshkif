// preload.js
const { ipcRenderer } = require('electron');

// Helper to show improved notifications in the renderer.
function notify(message) {
    // The native Notification API in browsers automatically displays the notification.
    new Notification('MAshkif', { body: message, icon: 'favicon.ico' });
}

// Remove duplicate listeners to prevent multiple activations.
ipcRenderer.removeAllListeners('update-local-entries');
ipcRenderer.removeAllListeners('upload-submissions');

ipcRenderer.on('update-local-entries', async () => {
    if (window.updateLocalEntries && typeof window.updateLocalEntries === 'function') {
        try {
            await window.updateLocalEntries();
        } catch (err) {
            notify(`Update failed: ${err.message}`);
        }
    } else {
        notify('Please navigate to the Manage Data page to update local entries.');
    }
});

ipcRenderer.on('upload-submissions', async () => {
    if (window.uploadSubmissions && typeof window.uploadSubmissions === 'function') {
        try {
            await window.uploadSubmissions();
        } catch (err) {
            notify(`Upload failed: ${err.message}`);
        }
    } else {
        notify('Please navigate to the Manage Data page to upload submissions.');
    }
});
