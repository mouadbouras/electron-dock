
import { app, BrowserView, BrowserWindow, ipcMain, MenuItem, shell, App } from "electron";
import { AppView } from "../models/app-view.model";


export class AppViewService {

    private heightOffset: number = 22;

    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private mainWindow: BrowserWindow;
    private views: { [id: string]: BrowserView; };

    public constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        mainWindow: BrowserWindow,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.mainWindow = mainWindow;
        this.views = {};
    }

    public renderViews(appViews: AppView[]): void {
        //this.views = {};
        for (const view of appViews) {
            this.addAppView(view.viewName, view.url);
        }
    }

    public switchView(viewName: string): void {
        if (this.views.hasOwnProperty(viewName)) {
            this.mainWindow.setBrowserView(this.views[viewName]);
            this.setBounds(this.views[viewName]);
        }
      }

    public addAppView(viewName: string, url: string): void {
        this.views[viewName] = new BrowserView();
        this.mainWindow.addBrowserView(this.views[viewName]);
        this.setBounds(this.views[viewName]);
        this.views[viewName].setAutoResize({
          height: true,
          width: true,
          horizontal: true,
          vertical: true,
        });
        this.views[viewName].webContents.loadURL(url);

        this.switchView(viewName);
    }

    public toggleMuteAppView(viewName: string, mute: boolean): void {
        this.views[viewName].webContents.setAudioMuted(mute);
    }

    public backAppView(viewName: string): void {
        this.views[viewName].webContents.goBack();
    }

    public deleteAppView(viewName: string, nextView: string): void {
        this.mainWindow.removeBrowserView(this.views[viewName]);
        delete this.views[viewName];

        this.switchView(nextView);
    }

    private setBounds(view: BrowserView): void {
        view.setBounds(
            { x: this.x ,
                y: this.y ,
                height: this.height - this.heightOffset,
                width: this.width,
            });
    }
}

