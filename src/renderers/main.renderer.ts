import { ipcRenderer } from "electron";
import { AppView } from "../models/app-view.model";
import * as documentHelper from "../services/htmldocument.service";

ipcRenderer.on("appViews", renderViews);

function switchView(viewName: string): void {
    ipcRenderer.send("switch-view", viewName);
}

function showContextMenu(viewName: string): void {
    ipcRenderer.send("open-context-menu", viewName);
}

function renderViews(event: any, appViews: AppView[]): void {
    documentHelper.getElementById("app-menu").innerHTML = "";
    for (const view of appViews) {
        const btnName = "btn-" + view.viewName;
        documentHelper.getElementById("app-menu").innerHTML +=
        "<li class='nav-item  my-2'>" +
            "<button id=" + btnName +
                " class='btn btn-circle'" +
                "style='background-image: url(\"" + view.icon + "\") !important'>" +
            "</button>" +
        "</li>";
    }
    for (const view of appViews) {
        const btnName = "btn-" + view.viewName;
        documentHelper.getElementById(btnName).onclick = (e) => switchView(view.viewName);
        documentHelper.getElementById(btnName).oncontextmenu = (e) => showContextMenu(view.viewName);
    }

    document.getElementById("btn-add").onclick  = () => { ipcRenderer.send("open-view-editor"); };
}
