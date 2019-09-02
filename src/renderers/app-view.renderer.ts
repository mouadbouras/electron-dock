import { ipcRenderer, app } from "electron";
import * as documentHelper from "../services/htmldocument.service";
import { AppView } from "../model/app-view.model";

document.getElementById('btn-save').onclick  = () => { save(); };
ipcRenderer.on("edit-view", renderView);

function renderView(event: any, appView: AppView): void {
    documentHelper.getInputElementById("app-name").value = appView.viewName;
    documentHelper.getInputElementById("app-url").value = appView.url;
    documentHelper.getInputElementById("app-icon").value = appView.icon;
}

function save(): void {
    ipcRenderer.send("edit-view", {
        viewName : documentHelper.getInputElementById("app-name").value,
        url : documentHelper.getInputElementById("app-url").value,
        icon : documentHelper.getInputElementById("app-icon").value
    } as AppView);
}

