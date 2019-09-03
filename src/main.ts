import { app, BrowserView, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { AppConfig } from "./models/app-config.model";
import { AppView } from "./models/app-view.model";
import { ConfigurationService } from "./services/configuration.service";

const configurationService = new ConfigurationService(app.getAppPath());

let mainWindow: BrowserWindow;
let appViewWindow: BrowserWindow;
let views: { [id: string]: BrowserView; };
let appViews: AppView[];
let appConfig: AppConfig;
const heightOffset = 22;

function createWindow() {
  appConfig = configurationService.getConfig();
  appViews = configurationService.getAppViews();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: "Distractions",
    height: appConfig.window.height,
    width: appConfig.window.width,
    icon: "distractions.icns",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "./contents/index.html"));
  //mainWindow.webContents.openDevTools({mode: "undocked"});

  renderViews();

  mainWindow.webContents.on("did-finish-load", () => {
    // send views to renderer
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


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("switch-view", (event, arg) => {
  if (views.hasOwnProperty(arg)) {
    mainWindow.setBrowserView(views[arg]);
    views[arg].setBounds(
      { x: appConfig.view.x ,
        y: appConfig.view.y ,
        height: mainWindow.getBounds().height - heightOffset,
        width: mainWindow.getBounds().width - appConfig.view.x,
      },
    );
  }
});

ipcMain.on("edit-view", (event, arg) => {
  configurationService.setAppView(arg);
  appViewWindow.close();
});

ipcMain.on("open-view-editor", (event, arg) => {
  openEditViewWindow(arg);
});

function renderViews(): void {
  views = {};
  for (const view of appViews) {
    views[view.viewName] = new BrowserView();
    mainWindow.addBrowserView(views[view.viewName]);
    views[view.viewName].setBounds(
      { x: appConfig.view.x ,
        y: appConfig.view.y ,
        height: mainWindow.getBounds().height - heightOffset,
        width: mainWindow.getBounds().width - appConfig.view.x,
      },
    );
    views[view.viewName].setAutoResize({
      height: true,
      width: true,
      horizontal: true,
      vertical: true,
    });
    views[view.viewName].webContents.loadURL(view.url);
  }
}

function openEditViewWindow(appView: AppView): void {
  appViewWindow = new BrowserWindow({
    height: appConfig.appViewPopup.height,
    width: appConfig.appViewPopup.width,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  appViewWindow.loadFile(path.join(__dirname, "./contents/appView.html"));
  // appViewWindow.webContents.openDevTools({mode: "undocked"});

  appViewWindow.webContents.on("did-finish-load", () => {
    // send views to renderer
    appViewWindow.webContents.send("edit-view", appView);
  });
}
