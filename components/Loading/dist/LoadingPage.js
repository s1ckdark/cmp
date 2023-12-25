'use client';
"use strict";
exports.__esModule = true;
var clsx_1 = require("clsx");
var react_1 = require("react");
var _1 = require(".");
var Loading_module_scss_1 = require("./Loading.module.scss");
var LoadingPage = function (_a) {
    var _b;
    var inComponent = _a.inComponent, test = _a.test;
    var hourGlassCursorRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var onMouseMove = function (e) {
            var cursor = hourGlassCursorRef.current;
            if (!cursor || !e.target)
                return;
            if (e.target instanceof Element) {
                var localName = e.target.localName;
                if (!localName)
                    return;
                if (['a', 'button'].includes(localName)) {
                    cursor.style.display = 'none';
                }
                else {
                    cursor.style.display = 'block';
                    cursor.style.left = e.pageX - 25 / 2 + "px";
                    cursor.style.top = e.pageY - 25 / 2 + "px";
                }
            }
        };
        window.addEventListener('mousemove', onMouseMove);
        return function () {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);
    return (React.createElement("div", { className: clsx_1["default"](Loading_module_scss_1["default"].loadingPage, (_b = {}, _b[Loading_module_scss_1["default"].inComponent] = inComponent, _b[Loading_module_scss_1["default"].test] = test, _b)) },
        React.createElement(_1["default"], null),
        React.createElement("div", { ref: hourGlassCursorRef, className: Loading_module_scss_1["default"].hourGlassCursor })));
};
exports["default"] = LoadingPage;
