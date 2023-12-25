'use client';
"use strict";
exports.__esModule = true;
require("@toast-ui/editor/dist/toastui-editor.css");
var react_editor_1 = require("@toast-ui/react-editor");
var react_1 = require("react");
var ToastEditor = function (_a) {
    var content = _a.content, editorRef = _a.editorRef;
    var toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync']
    ];
    // useEffect(() => {
    //     if (editorRef.current) {
    //         editorRef.current.getInstance().removeHook("addImageBlobHook");
    //         editorRef.current
    //         .getInstance()
    //         .addHook("addImageBlobHook", (blob:any, callback:any) => {
    //             (async () => {
    //             let formData = new FormData();
    //             formData.append("file", blob);
    //             axios.defaults.withCredentials = true;
    //             const { data: url } = await axios.post(
    //                 `${backUrl}image.do`,
    //                 formData,
    //                 {
    //                 headers: { "content-type": "multipart/formdata" },
    //                 }
    //             );
    //             callback(url, "alt text");
    //             })();
    //             return false;
    //         });
    //     }
    //     return () => {};
    // }, [editorRef]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, editorRef && (react_1["default"].createElement(react_editor_1.Editor, { height: "600px", initialEditType: "wysiwyg", initialValue: content || ' ', previewStyle: window.innerWidth > 1000 ? 'vertical' : 'tab', ref: editorRef, theme: '', usageStatistics: false, toolbarItems: toolbarItems, useCommandShortcut: true, placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." }))));
};
exports["default"] = ToastEditor;
