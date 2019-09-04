import * as fs from "fs";
import AppConfigs from "../configs/appConfig.json";
import AppViews from "../configs/appViews.json";
import { AppConfig } from "../models/app-config.model";
import { AppView } from "../models/app-view.model";

export class ConfigurationService {
    private appPath: string;
    private appViewsPath: string;

    public constructor(appPath: string) {
        this.appPath = appPath;
        this.appViewsPath = this.appPath + "/configs/appViews.json";
    }

    public getAppViews(): AppView[] {
        return AppViews as AppView[];
    }

    public getConfig(): AppConfig {
        return AppConfigs as AppConfig;
    }

    public setAppView(appView: AppView): void {
        // @ts-ignore
        const index = AppViews.findIndex((v: AppView) => v.viewName === appView.viewName);
        if (index >= 0) {
            AppViews[index] = appView;
        } else {
            AppViews.push(appView);
        }
        fs.writeFile(this.appViewsPath, JSON.stringify(AppViews), (err) => {
            if (err) {
                console.log("upable to save file : " + err);
            }
        });
    }
}
