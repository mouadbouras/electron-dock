import AppViews from "../config/appViews.json";
import { AppView } from "../model/app.view";

export class ConfigurationService {
    public getAppViews(): AppView[] {
        return AppViews as AppView[];
    }
}
