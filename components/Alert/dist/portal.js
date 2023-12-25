"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var AlertPortal = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), element = _b[0], setElement = _b[1];
    var _c = react_1.useState(false), isCSR = _c[0], setIsCSR = _c[1];
    react_1.useEffect(function () {
        setElement(document.getElementById('portal'));
        setIsCSR(true);
    }, []);
    if (!isCSR)
        return React.createElement(React.Fragment, null);
    if (!element)
        return React.createElement(React.Fragment, null);
    return react_dom_1.createPortal(children, element);
};
exports["default"] = AlertPortal;
