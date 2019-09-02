"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var appConfig_json_1 = __importDefault(require("../config/appConfig.json"));
var appViews_json_1 = __importDefault(require("../config/appViews.json"));
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(appPath) {
        this.appPath = appPath;
        this.appViewsPath = this.appPath + "/config/appViews.json";
    }
    ConfigurationService.prototype.getAppViews = function () {
        return appViews_json_1["default"];
    };
    ConfigurationService.prototype.getConfig = function () {
        return appConfig_json_1["default"];
    };
    ConfigurationService.prototype.setAppView = function (appView) {
        // @ts-ignore
        var index = appViews_json_1["default"].findIndex(function (v) { return v.viewName === appView.viewName; });
        if (index > 0) {
            appViews_json_1["default"][index] = appView;
        }
        else {
            appViews_json_1["default"].push(appView);
        }
        fs.writeFile(this.appViewsPath, JSON.stringify(appViews_json_1["default"]), function (err) {
            if (err) {
                console.log("upable to save file : " + err);
            }
        });
    };
    return ConfigurationService;
}());
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map