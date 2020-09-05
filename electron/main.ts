import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);

    mainWindow.webContents.openDevTools({
      mode: 'detach',
    });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  mainWindow?.webContents.on('did-finish-load', () => {});
});

app.allowRendererProcessReuse = true;

ipcMain.on('testEvent', () => {
  console.log('oi?');

  mainWindow?.webContents.send('returnEvent', { data: 'tchau' });
});
