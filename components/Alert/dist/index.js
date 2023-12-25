'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useAlert_1 = require("@/hooks/useAlert");
var portal_1 = require("./portal");
var View_1 = require("./View");
var index_module_scss_1 = require("./index.module.scss");
var Alert = function () {
    var _a = useAlert_1["default"](), alert = _a.alert, addAlert = _a.addAlert;
    // const { logOut } = useAuth();
    var handleAxiosError = react_1.useCallback(function (event) {
        if (!event.detail)
            return;
        var _a = event.detail.message, message = _a === void 0 ? '' : _a;
        console.log(message);
        if (message === 'Unauthorized') {
            addAlert({ message: '권한이 없습니다.' });
            // } else if (message === 'Forbidden') {
            //     addAlert({ message: '다시 로그인해주세요.', onConfirm: logOut });
        }
        else if (message === 'Bad Request') {
            addAlert({ message: '잘못된 요청입니다.' });
        }
        else {
            addAlert({ message: message });
        }
    }, [addAlert]);
    react_1.useEffect(function () {
        window.addEventListener('axiosError', handleAxiosError);
        return function () {
            window.removeEventListener('axiosError', handleAxiosError);
        };
    }, [handleAxiosError]);
    if (!alert)
        return null;
    return (React.createElement(portal_1["default"], null,
        React.createElement("div", { className: index_module_scss_1["default"].alertWrapper },
            React.createElement(View_1["default"], { alert: alert }))));
};
exports["default"] = Alert;
