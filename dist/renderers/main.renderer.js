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
var documentHelper = __importStar(require("../services/htmldocument.service"));
electron_1.ipcRenderer.on("appViews", renderViews);
function switchView(viewName) {
    electron_1.ipcRenderer.send("switch-view", viewName);
}
function renderViews(event, appViews) {
    documentHelper.getElementById("app-menu").innerHTML = "";
    for (var _i = 0, appViews_1 = appViews; _i < appViews_1.length; _i++) {
        var view = appViews_1[_i];
        var btnName = "btn-" + view.viewName;
        documentHelper.getElementById("app-menu").innerHTML +=
            "<li class='nav-item  my-2'>" +
                "<button id=" + btnName +
                " class='btn btn-circle'" +
                "style='background-image: url(\"" + view.icon + "\") !important'>" +
                "</button>" +
                "</li>";
    }
    var _loop_1 = function (view) {
        var btnName = "btn-" + view.viewName;
        documentHelper.getElementById(btnName).onclick = function () { switchView(view.viewName); };
    };
    for (var _a = 0, appViews_2 = appViews; _a < appViews_2.length; _a++) {
        var view = appViews_2[_a];
        _loop_1(view);
    }
}
//# sourceMappingURL=main.renderer.js.map