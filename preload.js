"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// preload.ts
const electron_1 = require("electron");
function notify(message) {
    new Notification('MAshkif', { body: message, icon: 'favicon.ico' });
}
electron_1.ipcRenderer.removeAllListeners('update-local-entries');
electron_1.ipcRenderer.removeAllListeners('upload-submissions');
electron_1.ipcRenderer.on('update-local-entries', async () => {
    if (window.updateLocalEntries && typeof window.updateLocalEntries === 'function') {
        try {
            await window.updateLocalEntries();
        }
        catch (err) {
            notify(`Update failed: ${err.message}`);
        }
    }
    else {
        notify('Please navigate to the Manage Data page to update local entries.');
    }
});
electron_1.ipcRenderer.on('upload-submissions', async () => {
    if (window.uploadSubmissions && typeof window.uploadSubmissions === 'function') {
        try {
            await window.uploadSubmissions();
        }
        catch (err) {
            notify(`Upload failed: ${err.message}`);
        }
    }
    else {
        notify('Please navigate to the Manage Data page to upload submissions.');
    }
});
