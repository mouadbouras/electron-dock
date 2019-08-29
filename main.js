// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let childWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: './AppIcon.icns',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  childWindow = new BrowserWindow({
    width: 200,
    height: 200,
    icon: './AppIcon.icns',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  function createViews () {
    browserWindow.addBrowserView(browserView)
    browserWindow.removeBrowserView(browserView)
  }

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  childWindow.loadFile('index.html')
  //mainWindow.loadURL('https://discordapp.com/channels/@me')
  let views; 

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // let menuView = new BrowserView()
  // mainWindow.setBrowserView(menuView)
  // menuView.setBounds({ x: 0, y: 0, width: 100, height: 800 })
  // menuView.webContents.loadFile('index.html')
  // menuView.webContents.openDevTools()

  let appView = new BrowserView()
  mainWindow.setBrowserView(appView)
  appView.setBounds({ x: 100, y: 0, width: 1100 , height: 800 })
  appView.webContents.loadFile('index.html')
  appView.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

exports.switchView = function switchView (tabId, tabUrl) {
  console.log("t");

  if(!tabId in views){
    console.log("tt");
    views[tabId] = new BrowserView()
    mainWindow.setBrowserView(views[tabId] )
    views[tabId].setBounds({ x: 0, y: 0, width: 100, height: 800 })
    views[tabId].webContents.loadFile(tabUrl)
  }

  // for(let view in views.values)
  // {
  //   mainWindow.removeBrowserView(view);
  // }

  // mainWindow.addBrowserView(views[tabId])


  console.log(viewName);
};

