"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.ipcRenderer.on("appViews", renderViews);
electron_1.ipcRenderer.send("switch-view", 1000);
function switchView(viewName) {
    electron_1.ipcRenderer.send("switch-view", viewName);
}
function renderViews(event, appViews) {
    document.getElementById("app-menu").innerHTML = "";
    var _loop_1 = function (view) {
        var btnName = "btn-" + view.viewName;
        console.log(btnName);
        document.getElementById("app-menu").innerHTML +=
            "<button id=" + btnName + " class='btn btn-primary' >" + view.viewName + "</button>";
        document.getElementById(btnName).addEventListener("click", function () { return switchView(view.viewName); });
    };
    for (var _i = 0, appViews_1 = appViews; _i < appViews_1.length; _i++) {
        var view = appViews_1[_i];
        _loop_1(view);
    }
}
//# sourceMappingURL=renderer.js.map