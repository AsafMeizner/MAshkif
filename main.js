// main.js
const { app, BrowserWindow, Tray, nativeImage, Notification, ipcMain, screen } = require('electron');
const path = require('path');

// Helper: Resolve asset paths reliably.
function getAssetPath(...paths) {
  return app.isPackaged
    ? path.join(process.resourcesPath, ...paths)
    : path.join(__dirname, ...paths);
}

let mainWindow;
let tray = null;
let trayWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: true,
    icon: getAssetPath('public', 'favicon.ico'),
    titleBarOverlay: {
      color: '#de4a37',
      symbolColor: '#ffffff'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: false
    }
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
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  trayWindow.loadURL(`file://${getAssetPath('tray.html')}`);
  trayWindow.on('blur', () => {
    if (trayWindow) trayWindow.hide();
  });
}

function createTray() {
  const trayIconPath = getAssetPath('public', 'favicon.ico');
  const trayIcon = nativeImage.createFromPath(trayIconPath);
  tray = new Tray(trayIcon);

  tray.on('click', (event, bounds) => {
    if (trayWindow && trayWindow.isVisible()) {
      trayWindow.hide();
    } else {
      const { x, y } = bounds || { x: 100, y: 100 };
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
  console.log('Tray created using icon:', trayIconPath);
}

function setupIpcHandlers() {
  ipcMain.on('tray-open', () => {
    if (mainWindow) mainWindow.show();
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-update', () => {
    if (mainWindow) {
      mainWindow.webContents.executeJavaScript(
        'window.updateLocalEntries && window.updateLocalEntries()'
      )
        .then(() => console.log('Executed updateLocalEntries in renderer'))
        .catch(err => console.error(err));
    }
    if (trayWindow) trayWindow.hide();
  });

  ipcMain.on('tray-upload', () => {
    if (mainWindow) {
      mainWindow.webContents.executeJavaScript(
        'window.uploadSubmissions && window.uploadSubmissions()'
      )
        .then(() => console.log('Executed uploadSubmissions in renderer'))
        .catch(err => console.error(err));
    }
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-clear', () => {
    if (mainWindow) {
      mainWindow.webContents.executeJavaScript('localStorage.clear(); console.log("Local storage cleared");');
      new Notification({
        title: 'MAshkif',
        body: 'Local storage cleared.',
        icon: getAssetPath('public', 'favicon.ico')
      }).show();
    }
    if (trayWindow) trayWindow.hide();
  });
  ipcMain.on('tray-close', () => {
    app.quit();
  });
  ipcMain.on('tray-resize', (event, height) => {
    if (trayWindow) {
      trayWindow.setSize(260, height, false);
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTrayWindow();
  createTray();
  setupIpcHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
