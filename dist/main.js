"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var electron_1 = require("electron");
var path = __importStar(require("path"));
var configuration_service_1 = require("./services/configuration.service");
var configurationService = new configuration_service_1.ConfigurationService(electron_1.app.getAppPath());
var mainWindow;
var appViewWindow;
var views;
var appViews;
var appConfig;
function createWindow() {
    appConfig = configurationService.getConfig();
    appViews = configurationService.getAppViews();
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: appConfig.window.height,
        width: appConfig.window.width,
        icon: "./AppIcon.icns",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    //mainWindow.webContents.openDevTools({mode: "undocked"});
    renderViews();
    mainWindow.webContents.on('did-finish-load', function () {
        // send views to renderer
        mainWindow.webContents.send("appViews", appViews);
    });
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
electron_1.ipcMain.on("switch-view", function (event, arg) {
    if (views.hasOwnProperty(arg)) {
        mainWindow.setBrowserView(views[arg]);
    }
});
electron_1.ipcMain.on("edit-view", function (event, arg) {
    configurationService.setAppView(arg);
    appViewWindow.close();
});
electron_1.ipcMain.on("open-view-editor", function (event, arg) {
    openEditViewWindow(arg);
});
function renderViews() {
    views = {};
    for (var _i = 0, appViews_1 = appViews; _i < appViews_1.length; _i++) {
        var view = appViews_1[_i];
        views[view.viewName] = new electron_1.BrowserView();
        mainWindow.addBrowserView(views[view.viewName]);
        views[view.viewName].setBounds({ x: appConfig.view.x,
            y: appConfig.view.y,
            width: appConfig.view.width,
            height: appConfig.view.height
        });
        views[view.viewName].webContents.loadURL(view.url);
    }
}
function openEditViewWindow(appView) {
    appViewWindow = new electron_1.BrowserWindow({
        height: appConfig.appViewPopup.height,
        width: appConfig.appViewPopup.width,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        }
    });
    appViewWindow.loadFile(path.join(__dirname, "../appView.html"));
    //appViewWindow.webContents.openDevTools({mode: "undocked"});
    appViewWindow.webContents.on('did-finish-load', function () {
        // send views to renderer
        appViewWindow.webContents.send("edit-view", appView);
    });
}
//# sourceMappingURL=main.js.map