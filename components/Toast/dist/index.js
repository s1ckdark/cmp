"use strict";
exports.__esModule = true;
exports.pushNoti = void 0;
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var autoClose = 1000;
exports.pushNoti = function (_a) {
    var type = _a.type, text = _a.text, onClose = _a.onClose;
    var toastOptions = {
        onClose: onClose
    };
    switch (type) {
        case "default":
            react_toastify_1.toast(text, toastOptions);
            break;
        case "success":
            react_toastify_1.toast.success(text, toastOptions);
            break;
        case "warning":
            react_toastify_1.toast.warning(text, toastOptions);
            break;
        case "error":
            react_toastify_1.toast.error(text, toastOptions);
            break;
        default:
            react_toastify_1.toast(text, toastOptions);
    }
};
var Toast = function () {
    return (React.createElement(react_toastify_1.ToastContainer, { position: "top-center", autoClose: autoClose, hideProgressBar: true, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: false, draggable: true, pauseOnHover: false, theme: "light" }));
};
exports["default"] = Toast;
