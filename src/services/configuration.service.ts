import * as fs from "fs";
import * as path from "path";
import AppConfigs from "../config/appConfig.json";
import AppViews from "../config/appViews.json";
import { AppConfig } from "../model/app-config.model";
import { AppView } from "../model/app-view.model";

export class ConfigurationService {
    private appPath: string;
    private appViewsPath: string;

    public constructor(appPath: string) {
        this.appPath = appPath;
        this.appViewsPath = this.appPath + "/config/appViews.json";
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
        if (index > 0) {
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
