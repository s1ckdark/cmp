'use client';
"use strict";
exports.__esModule = true;
var clsx_1 = require("clsx");
var Loading_module_scss_1 = require("./Loading.module.scss");
var Loading = function (_a) {
    var _b;
    var small = _a.small, test = _a.test, className = _a.className;
    return (React.createElement("div", { className: clsx_1["default"](Loading_module_scss_1["default"].loading, className, (_b = {}, _b[Loading_module_scss_1["default"].small] = small, _b[Loading_module_scss_1["default"].test] = test, _b)) },
        React.createElement("p", null, "Loading...")));
};
exports["default"] = Loading;
