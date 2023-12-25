"use strict";
exports.__esModule = true;
exports.Modal = void 0;
var clsx_1 = require("clsx");
var react_1 = require("react");
var react_use_1 = require("react-use");
var react_dom_1 = require("react-dom");
var react_transition_group_1 = require("react-transition-group");
var svgs_1 = require("@/public/svgs");
var Modal_module_scss_1 = require("./Modal.module.scss");
exports.Modal = react_1.memo(function (_a) {
    var isShow = _a.isShow, className = _a.className, header = _a.header, children = _a.children, closeIcon = _a.closeIcon, onClose = _a.onClose;
    react_use_1.useUnmount(function () {
        onClose();
    });
    var ref = react_1.useRef(null);
    var _b = react_1.useState(false), mounted = _b[0], setMounted = _b[1];
    react_use_1.useMount(function () {
        ref.current = document.getElementById('modal');
        setMounted(true);
    });
    if (!mounted || !ref.current)
        return null;
    return react_dom_1.createPortal(React.createElement(react_transition_group_1.CSSTransition, { "in": isShow, timeout: 200, classNames: {
            enter: Modal_module_scss_1["default"].enter,
            enterActive: Modal_module_scss_1["default"].enterActive,
            exit: Modal_module_scss_1["default"].exit,
            exitActive: Modal_module_scss_1["default"].exitActive
        }, mountOnEnter: true, unmountOnExit: true },
        React.createElement("div", { className: Modal_module_scss_1["default"].modalWrapper },
            React.createElement("button", { type: 'button', className: Modal_module_scss_1["default"].bg, onClick: onClose, "aria-label": 'close' }),
            React.createElement("div", { className: Modal_module_scss_1["default"].wrapper },
                React.createElement("dialog", { className: clsx_1["default"](Modal_module_scss_1["default"].modal, className), translate: 'no' },
                    header && (React.createElement("header", { className: Modal_module_scss_1["default"].header },
                        React.createElement("h2", null, header),
                        React.createElement("button", { type: 'button', className: Modal_module_scss_1["default"].closeButton, onClick: onClose, "aria-label": 'close' },
                            React.createElement(svgs_1.IconClose, null)))),
                    closeIcon && (React.createElement("button", { type: 'button', className: clsx_1["default"](Modal_module_scss_1["default"].closeButton, Modal_module_scss_1["default"].only), onClick: onClose, "aria-label": 'close' },
                        React.createElement(svgs_1.IconClose, null))),
                    React.createElement("div", { className: Modal_module_scss_1["default"].contents }, children))))), ref.current);
});
