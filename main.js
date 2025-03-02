// main.js
const { app, BrowserWindow, Tray, nativeImage, Notification, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;
let trayWindow = null;

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
      contextIsolation: false, // For demo purposes; use contextBridge in production
    },
  });

  mainWindow.setMenu(null);

  const startUrl = process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, 'build', 'index.html')}`;
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTrayWindow() {
  // Start with an initial height; it will be resized later.
  trayWindow = new BrowserWindow({
    width: 260,
    height: 100,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true, // Needed to load our local HTML file
      contextIsolation: false,
    },
  });

  trayWindow.loadURL(`file://${path.join(__dirname, 'tray.html')}`);

  trayWindow.on('blur', () => {
    if (trayWindow) trayWindow.hide();
  });
}

function createTray() {
  const trayIconPath = path.join(__dirname, 'public', 'favicon.ico');
  const trayIcon = nativeImage.createFromPath(trayIconPath);
  tray = new Tray(trayIcon);

  tray.on('click', (event, bounds) => {
    if (trayWindow && trayWindow.isVisible()) {
      trayWindow.hide();
    } else {
      const { x, y } = bounds;
      const { width, height } = trayWindow.getBounds();
      const display = screen.getPrimaryDisplay();
      let trayWindowX = Math.round(x - width / 2);
      let trayWindowY = process.platform === 'darwin' ? y : y - height;
      trayWindowX = Math.max(0, Math.min(trayWindowX, display.workArea.width - width));
      trayWindow.setPosition(trayWindowX, trayWindowY, false);
      trayWindow.show();
      trayWindow.focus();
    }
  });

  tray.on('right-click', () => {
    if (trayWindow && trayWindow.isVisible()) {
      trayWindow.hide();
    } else {
      trayWindow.show();
    }
  });

  tray.setToolTip('MAshkif');
}

app.whenReady().then(() => {
  createWindow();
  createTrayWindow();
  createTray();

  // IPC handlers for tray window button actions.
  ipcMain.on('tray-open', () => {
    if (mainWindow) mainWindow.show();
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-update', () => {
    if (mainWindow) {
      mainWindow.webContents.send('update-local-entries');
    }
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-upload', () => {
    if (mainWindow) {
      mainWindow.webContents.send('upload-submissions');
    }
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-clear', () => {
    if (mainWindow) {
      mainWindow.webContents.executeJavaScript('localStorage.clear(); console.log("Local storage cleared");');
      new Notification({
        title: 'MAshkif',
        body: 'Local storage cleared.',
        icon: path.join(__dirname, 'public', 'favicon.ico'),
      }).show();
    }
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-close', () => {
    app.quit();
  });
  // Listen for the resize message from the tray window.
  ipcMain.on('tray-resize', (event, height) => {
    if (trayWindow) {
      trayWindow.setSize(260, height, false);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
