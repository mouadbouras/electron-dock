import { ipcRenderer } from "electron";
import { AppView } from "../models/app-view.model";
import * as documentHelper from "../services/htmldocument.service";

document.getElementById("btn-save").onclick  = () => { save(); };
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
        icon : documentHelper.getInputElementById("app-icon").value,
    } as AppView);
}

