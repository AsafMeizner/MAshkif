// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // Enable preload script if needed:
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // For security, avoid enabling Node integration in renderer.
      contextIsolation: true, // Recommended for security.
    },
  });

  // In development, load the React dev server URL.
  // In production, load the built index.html.
  const startUrl = process.env.ELECTRON_START_URL || 
    `file://${path.join(__dirname, 'build', 'index.html')}`;
  mainWindow.loadURL(startUrl);

  // Optionally open DevTools:
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS, it is common for applications to stay open until explicitly quit.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window when the dock icon is clicked.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
