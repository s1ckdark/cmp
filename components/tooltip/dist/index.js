"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var headless_1 = require("@tippyjs/react/headless");
var styled_components_1 = require("styled-components");
function Tooltip(_a) {
    var children = _a.children, content = _a.content, _b = _a.placement, placement = _b === void 0 ? 'top' : _b;
    return (React.createElement(headless_1["default"], { render: function (attrs) { return React.createElement(TooltipWrapper, __assign({}, attrs), content); }, placement: placement }, children));
}
exports["default"] = Tooltip;
var TooltipWrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  border-radius: 8px;\n  background-color: ", ";\n  padding: 8px 16px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 500;\n  text-align: center;\n  white-space: nowrap;\n  transition: all 0.2s;\n"], ["\n  width: 100%;\n  border-radius: 8px;\n  background-color: ", ";\n  padding: 8px 16px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 500;\n  text-align: center;\n  white-space: nowrap;\n  transition: all 0.2s;\n"])), function (_a) {
    var colors = _a.theme.colors;
    return colors.neutral;
}, function (_a) {
    var colors = _a.theme.colors;
    return colors.secondary;
});
var templateObject_1;
