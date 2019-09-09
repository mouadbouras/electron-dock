import { app, BrowserView, BrowserWindow, ipcMain, MenuItem, shell } from "electron";
//import contextMenu from "electron-context-menu";
import * as path from "path";
import { AppConfig } from "./models/app-config.model";
import { AppView } from "./models/app-view.model";
import { ConfigurationService } from "./services/configuration.service";
import { MenuService } from "./services/menu.service";
import { AppViewService } from "./services/appview.service";

const configurationService = new ConfigurationService(app.getAppPath());
const menuService =  new MenuService(handleButtonContextMenu);
let appViewService: AppViewService;

let mainWindow: BrowserWindow;
let appViewWindow: BrowserWindow;
let views: { [id: string]: BrowserView; };
let appViews: AppView[];
let appConfig: AppConfig;

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

  appViewService = new AppViewService(
    appConfig.view.x,
    appConfig.view.y,
    appConfig.view.width,
    appConfig.view.height,
    mainWindow,
  );

  appViewService.renderViews(appViews);

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

// app.on("activate", () => {
//   // On OS X it"s common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("switch-view", (event, arg: string) => {
  appViewService.switchView(arg);
});

ipcMain.on("edit-view", (event, arg: AppView) => {
  editView(arg);
});

ipcMain.on("open-view-editor", (event, arg: AppView) => {
  if (arg) {
    openEditViewWindow(arg);
  } else {
    openEditViewWindow({
      viewName: "UniqueViewName",
      url: "https://www.google.com/",
      icon: "./images/placeholder.png",
    } as AppView );
  }
});

ipcMain.on("close-view-editor", (event, arg: AppView) => {
  closeEditViewWindow();
});

ipcMain.on("open-context-menu", (event, arg) => {
  menuService.ShowContextMenu(arg);
});

function openEditViewWindow(appView: AppView): void {
  appViewWindow = new BrowserWindow({
    height: appConfig.appViewPopup.height,
    width: appConfig.appViewPopup.width,
    parent: mainWindow,
    show: false,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  appViewWindow.loadFile(path.join(__dirname, "./contents/appview.html"));
  // appViewWindow.webContents.openDevTools({mode: "undocked"});

  appViewWindow.once("ready-to-show", () => {
    appViewWindow.show();
  });

  appViewWindow.webContents.on("did-finish-load", () => {
    // send views to renderer
    appViewWindow.webContents.send("edit-view", appView);
  });
}

function closeEditViewWindow() {
  appViewWindow.close();
}

function editView(appView: AppView): void {
  appViews = configurationService.addSertAppView(appView);
  appViewService.addAppView(appView.viewName, appView.url);
  appViewWindow.close();
  refreshButtons();
}

function deleteView(appView: AppView): void {
  appViews = configurationService.deleteAppView(appView);
  appViewService.deleteAppView(appView.viewName, appViews[appViews.length - 1].viewName);
  refreshButtons();
}

function refreshButtons(): void {
  mainWindow.webContents.send("appViews", appViews);
}

function handleButtonContextMenu(clickedItem: string): void {
  const selectedView = menuService.ConsumeContextMenu();
  switch (clickedItem) {
    case "Mute" : views[selectedView].webContents.setAudioMuted(true);
    break;
    case "Unmute" : views[selectedView].webContents.setAudioMuted(false);
    break;
    case "Back" : views[selectedView].webContents.goBack();
    break;
    case "Edit" : openEditViewWindow(appViews.find((view) => view.viewName === selectedView));
    break;
    case "Delete" : deleteView(appViews.find((view) => view.viewName === selectedView));
    break;
  }
}
