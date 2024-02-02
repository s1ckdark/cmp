"use strict";
exports.__esModule = true;
var react_editor_1 = require("@toast-ui/react-editor");
require("@toast-ui/editor/dist/toastui-editor-viewer.css");
var react_1 = require("react");
var ToastViewer = function (_a) {
    var content = _a.content, editorRef = _a.editorRef;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, editorRef && (react_1["default"].createElement(react_editor_1.Viewer, { initialValue: content || ' ', ref: editorRef }))));
};
exports["default"] = ToastViewer;
