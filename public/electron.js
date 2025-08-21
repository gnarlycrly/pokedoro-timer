const{ app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { create } = require('domain');

function createMainWindow() {
    const mainWindow= new BrowserWindow({
        title: 'TomatoTimer',
        width: 500,
        height: 660,
        useContentSize: true,     // critical: sizes refer to the web page, not the frame
        resizable: false
    });
    //mainWindow.setAspectRatio(425 / 560);
    const startUrl=url.format({
        pathname: path.join(__dirname, '../build/index.html'), //connect to the react app
        protocol: 'file:',
        slashes: true,
    });

    mainWindow.loadURL(startUrl); //load app in electron window
}

app.whenReady().then(createMainWindow)