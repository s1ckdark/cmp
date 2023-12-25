"use strict";
exports.__esModule = true;
var react_hotkeys_hook_1 = require("react-hotkeys-hook");
var useAlert_1 = require("@/hooks/useAlert");
var Button_1 = require("@/components/Button");
var index_module_scss_1 = require("./index.module.scss");
var View = function (_a) {
    var alert = _a.alert;
    var removeAlert = useAlert_1["default"]().removeAlert;
    var title = alert.title, message = alert.message, onCancel = alert.onCancel, onConfirm = alert.onConfirm, confirmLabel = alert.confirmLabel, cancelLabel = alert.cancelLabel;
    var handleCancel = function () {
        if (onCancel)
            onCancel();
        removeAlert();
    };
    var handleConfirm = function () {
        if (onConfirm)
            onConfirm();
        removeAlert();
    };
    react_hotkeys_hook_1.useHotkeys('escape', function () { return removeAlert(); });
    react_hotkeys_hook_1.useHotkeys('enter', function () { return handleConfirm(); });
    return (React.createElement("aside", { className: index_module_scss_1["default"].alert },
        title && (React.createElement("h1", { className: index_module_scss_1["default"].title, translate: 'yes' }, title)),
        message && (React.createElement("div", { className: index_module_scss_1["default"].message, translate: 'yes' }, message)),
        React.createElement("div", { className: index_module_scss_1["default"].buttonsWrapper },
            cancelLabel && React.createElement(Button_1["default"], { onClick: handleCancel }, cancelLabel),
            React.createElement(Button_1["default"], { onClick: handleConfirm, skin: 'primary' }, confirmLabel || '확인'))));
};
exports["default"] = View;
