import { ipcRenderer } from "electron";
import { AppView } from "./model/app.view";

ipcRenderer.on("appViews", renderViews);
ipcRenderer.send("switch-view", 1000);

function switchView(viewName: string): void {
    ipcRenderer.send("switch-view", viewName);
}

function renderViews(event: any, appViews: AppView[]): void {
    document.getElementById("app-menu").innerHTML = "";
    for (const view of appViews) {
        const btnName = "btn-" + view.viewName;
        console.log(btnName);
        document.getElementById("app-menu").innerHTML +=
         "<button id=" + btnName + " class='btn btn-primary' >" + view.viewName + "</button>";
        document.getElementById(btnName).addEventListener("click", () => switchView(view.viewName));
    }
}
