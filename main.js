"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// Ensure single instance
const gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });
}
if (process.platform === 'win32') {
    electron_1.app.setAppUserModelId('MakersAssemble.MAshkif');
}
// Helper: Resolve asset paths reliably.
function getAssetPath(...paths) {
    return electron_1.app.isPackaged
        ? path.join(process.resourcesPath, ...paths)
        : path.join(__dirname, ...paths);
}
let mainWindow = null;
let tray = null;
let trayWindow = null;
function createWindow() {
    const windowOptions = {
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
    };
    mainWindow = new electron_1.BrowserWindow(windowOptions);
    mainWindow.setMenu(null);
    const startUrl = process.env.ELECTRON_START_URL ||
        `file://${path.join(__dirname, 'build', 'index.html')}`;
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
function createTrayWindow() {
    const trayWindowOptions = {
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
    };
    trayWindow = new electron_1.BrowserWindow(trayWindowOptions);
    trayWindow.loadURL(`file://${getAssetPath('tray.html')}`);
    trayWindow.on('blur', () => {
        if (trayWindow) {
            trayWindow.hide();
        }
    });
}
function createTray() {
    const trayIconPath = getAssetPath('public', 'favicon.ico');
    const trayIcon = electron_1.nativeImage.createFromPath(trayIconPath);
    tray = new electron_1.Tray(trayIcon);
    tray.on('click', (event, bounds) => {
        if (trayWindow && trayWindow.isVisible()) {
            trayWindow.hide();
        }
        else {
            const { x, y } = bounds || { x: 100, y: 100 };
            const { width, height } = trayWindow.getBounds();
            const display = electron_1.screen.getPrimaryDisplay();
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
        }
        else {
            trayWindow.show();
        }
    });
    tray.setToolTip('MAshkif');
    console.log('Tray created using icon:', trayIconPath);
}
function setupIpcHandlers() {
    electron_1.ipcMain.on('tray-open', () => {
        if (!mainWindow) {
            createWindow();
        }
        else {
            if (!mainWindow.isVisible()) {
                mainWindow.show();
            }
            mainWindow.focus();
        }
        if (trayWindow) {
            trayWindow.hide();
        }
    });
    electron_1.ipcMain.on('tray-update', () => {
        if (mainWindow) {
            mainWindow.webContents.executeJavaScript('window.updateLocalEntries && window.updateLocalEntries()')
                .then(() => console.log('Executed updateLocalEntries in renderer'))
                .catch(err => console.error(err));
        }
        if (trayWindow) {
            trayWindow.hide();
        }
    });
    electron_1.ipcMain.on('tray-upload', () => {
        if (mainWindow) {
            mainWindow.webContents.executeJavaScript('window.uploadSubmissions && window.uploadSubmissions()')
                .then(() => console.log('Executed uploadSubmissions in renderer'))
                .catch(err => console.error(err));
        }
        if (trayWindow) {
            trayWindow.hide();
        }
    });
    electron_1.ipcMain.on('tray-clear', () => {
        if (mainWindow) {
            mainWindow.webContents.executeJavaScript('localStorage.clear(); console.log("Local storage cleared");');
            new electron_1.Notification({
                title: 'MAshkif',
                body: 'Local storage cleared.',
                icon: getAssetPath('public', 'favicon.ico')
            }).show();
        }
        if (trayWindow) {
            trayWindow.hide();
        }
    });
    electron_1.ipcMain.on('tray-close', () => {
        electron_1.app.quit();
    });
    electron_1.ipcMain.on('tray-resize', (event, height) => {
        if (trayWindow) {
            trayWindow.setSize(260, height, false);
        }
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    createTrayWindow();
    createTray();
    setupIpcHandlers();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
