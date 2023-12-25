"use strict";
exports.__esModule = true;
var clsx_1 = require("clsx");
var link_1 = require("next/link");
var index_module_scss_1 = require("./index.module.scss");
var Button = function (_a) {
    var link = _a.link, children = _a.children, className = _a.className, disabled = _a.disabled, onClick = _a.onClick, type = _a.type, size = _a.size, skin = _a.skin;
    if (link) {
        return (React.createElement(link_1["default"], { href: link, className: clsx_1["default"](index_module_scss_1["default"].commonButton, className, index_module_scss_1["default"][size !== null && size !== void 0 ? size : 'normal'], index_module_scss_1["default"][skin !== null && skin !== void 0 ? skin : 'normal']) }, children));
    }
    return (React.createElement("button", { type: type, disabled: disabled, className: clsx_1["default"](index_module_scss_1["default"].commonButton, className, index_module_scss_1["default"][size !== null && size !== void 0 ? size : 'normal'], index_module_scss_1["default"][skin !== null && skin !== void 0 ? skin : 'normal']), onClick: onClick }, children));
};
exports["default"] = Button;
