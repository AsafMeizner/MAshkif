// main.js
const { app, BrowserWindow, Menu, Tray, nativeImage, Notification } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: true,
    icon: path.join(__dirname, 'public', 'favicon.ico'), // Use your custom app icon
    titleBarOverlay: {
      color: '#de4a37',
      symbolColor: '#ffffff',
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: false, // For demo; consider using contextBridge in production
    },
  });

  Menu.setApplicationMenu(null);

  const startUrl = process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, 'build', 'index.html')}`;
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  // Use your favicon as the tray icon.
  const trayIconPath = path.join(__dirname, 'public', 'favicon.ico');
  const trayIcon = nativeImage.createFromPath(trayIconPath);
  tray = new Tray(trayIcon);

  const trayMenu = Menu.buildFromTemplate([
    {
      label: '🚀 MAshkif', // Header with emoji flair (non-clickable)
      enabled: false,
    },
    { type: 'separator' },
    {
      label: '⚡ Open',
      icon: nativeImage.createFromPath(path.join(__dirname, 'public', 'open.png')) || trayIcon,
      click: () => {
        if (mainWindow) mainWindow.show();
      },
    },
    {
      label: '🔄 Update Local Entries',
      icon: nativeImage.createFromPath(path.join(__dirname, 'public', 'update.png')) || trayIcon,
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('update-local-entries');
        }
      },
    },
    {
      label: '📤 Upload Submissions',
      icon: nativeImage.createFromPath(path.join(__dirname, 'public', 'upload.png')) || trayIcon,
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('upload-submissions');
        }
      },
    },
    {
      label: '🧹 Clear Local Storage',
      icon: nativeImage.createFromPath(path.join(__dirname, 'public', 'clear.png')) || trayIcon,
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.executeJavaScript(
            'localStorage.clear(); console.log("Local storage cleared");'
          );
          new Notification({
            title: 'MAshkif',
            body: 'Local storage cleared.',
            icon: path.join(__dirname, 'public', 'favicon.ico')
          }).show();
        }
      },
    },
    { type: 'separator' },
    {
      label: '❌ Close',
      icon: nativeImage.createFromPath(path.join(__dirname, 'public', 'close.png')) || trayIcon,
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('MAshkif');
  tray.setContextMenu(trayMenu);

  // Enable left-click to open the main window.
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
