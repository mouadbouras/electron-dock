import { app, BrowserView, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { AppView } from "./model/app.view";
import { ConfigurationService } from "./services/configuration.service";

const configurationService = new ConfigurationService();

let mainWindow: BrowserWindow;
let views: BrowserView[];
let appViews: AppView[];

function createWindow() {
  appViews = configurationService.getAppViews();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    icon: "./AppIcon.icns",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  mainWindow.webContents.openDevTools({mode: "undocked"});
  views = new Array();

  views[0] = new BrowserView();
  mainWindow.addBrowserView(views[0]);
  views[0].setBounds({ x: 100, y: 22, width: 1100 , height: 800 });
  views[0].webContents.loadURL("https://slack.com/signin");

  views[1] = new BrowserView();
  mainWindow.addBrowserView(views[1]);
  views[1].setBounds({ x: 100, y: 22, width: 1100 , height: 800 });
  views[1].webContents.loadURL("https://portal.azure.com/#home");

  // send views to renderer
  //mainWindow.webContents.send("appViews", appViews);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send("appViews", appViews);
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("switch-view", (event, arg) => {
  console.log("switch-it-up" + arg); // prints "ping"
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// exports.switchView = function switchView(tabId: number) {
//   // mainWindow.setBrowserView(views[tabId-1]);
//   console.log(tabId);
// };
