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
document.getElementById('btn-save').onclick = function () { save(); };
electron_1.ipcRenderer.on("edit-view", renderView);
function renderView(event, appView) {
    documentHelper.getInputElementById("app-name").value = appView.viewName;
    documentHelper.getInputElementById("app-url").value = appView.url;
    documentHelper.getInputElementById("app-icon").value = appView.icon;
}
function save() {
    electron_1.ipcRenderer.send("edit-view", {
        viewName: documentHelper.getInputElementById("app-name").value,
        url: documentHelper.getInputElementById("app-url").value,
        icon: documentHelper.getInputElementById("app-icon").value
    });
}
//# sourceMappingURL=app-view.renderer.js.map