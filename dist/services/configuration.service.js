"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var appViews_json_1 = __importDefault(require("../config/appViews.json"));
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService() {
    }
    ConfigurationService.prototype.getAppViews = function () {
        return appViews_json_1["default"];
    };
    return ConfigurationService;
}());
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map