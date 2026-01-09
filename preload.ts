// preload.ts
import { ipcRenderer } from 'electron';

// Extend Window interface for TypeScript
declare global {
  interface Window {
    updateLocalEntries?: () => Promise<void>;
    uploadSubmissions?: () => Promise<void>;
  }
}

function notify(message: string): void {
    new Notification('MAshkif', { body: message, icon: 'favicon.ico' });
}

ipcRenderer.removeAllListeners('update-local-entries');
ipcRenderer.removeAllListeners('upload-submissions');

ipcRenderer.on('update-local-entries', async () => {
    if (window.updateLocalEntries && typeof window.updateLocalEntries === 'function') {
        try {
            await window.updateLocalEntries();
        } catch (err) {
            notify(`Update failed: ${(err as Error).message}`);
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
            notify(`Upload failed: ${(err as Error).message}`);
        }
    } else {
        notify('Please navigate to the Manage Data page to upload submissions.');
    }
});
