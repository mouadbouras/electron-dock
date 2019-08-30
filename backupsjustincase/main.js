// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')
const fs = require("fs");


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let views = new Array();
const appViews = readJsonFile('./appViews.json');

console.log(appViews[0]);
  function createViews () {
    browserWindow.addBrowserView(browserView)
    browserWindow.removeBrowserView(browserView)
  }

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

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  views[0] = new BrowserView()
  mainWindow.addBrowserView(views[0])
  views[0].setBounds({ x: 100, y: 22, width: 1100 , height: 800 })
  //appView1.webContents.loadFile('index.html')
  views[0].webContents.loadURL('https://slack.com/signin')


  views[1] = new BrowserView()
  mainWindow.addBrowserView(views[1])
  views[1].setBounds({ x: 100, y: 22, width: 1100 , height: 800 })
  views[1].webContents.loadURL('https://portal.azure.com/#home')

  console.log('done');

  // send views to renderer
  mainWindow.webContents.send('appViews', appViews);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function readJsonFile(path){
  return JSON.parse(fs.readFileSync(path));
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

exports.switchView = function switchView (tabId) {
  mainWindow.setBrowserView(views[tabId-1]);
  console.log(views[tabId-1]);
  // switch(tabId)
  // {
  //   case 1: 
  //     mainWindow.setBrowserView(mainWindow.getBrowserView(tabId-1));
  //   break;
  //   case 2: 
  //     mainWindow.setBrowserView(mainWindow.getBrowserView(tabId-1));
  //   break;
  //   default:;
  // }


  // if(!tabId in views){
  //   console.log("tt");
  //   views[tabId] = new BrowserView()
  //   mainWindow.setBrowserView(views[tabId] )
  //   views[tabId].setBounds({ x: 0, y: 0, width: 100, height: 800 })
  //   views[tabId].webContents.loadFile(tabUrl)
  // }

  // for(let view in views.values)
  // {
  //   mainWindow.removeBrowserView(view);
  // }

  // mainWindow.addBrowserView(views[tabId])


  console.log(viewName);
};

