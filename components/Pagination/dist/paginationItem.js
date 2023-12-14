"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.PaginationItem = void 0;
var color_1 = require("@/utils/color");
var usePagination_1 = require("./usePagination");
var styled_components_1 = require("styled-components");
var DOTS_UNICODE = '\u2026';
exports.PaginationItem = function (_a) {
    var isActive = _a.isActive, page = _a.page, onPageChange = _a.onPageChange, disabled = _a.disabled;
    if (page === usePagination_1.DOTS) {
        return React.createElement(PaginationDots, { disabled: disabled }, DOTS_UNICODE);
    }
    return (React.createElement(PaginationItemWrapper, { role: "tab" },
        React.createElement(PaginationItemButton, { isActive: isActive, onClick: function () { return onPageChange(page); }, disabled: disabled }, page)));
};
var PaginationItemWrapper = styled_components_1["default"].li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  list-style: none;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  list-style: none;\n"])));
var PaginationItemButton = styled_components_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  border-radius: 50%;\n  background-color: ", ";\n  width: 24px;\n  height: 24px;\n  color: ", ";\n  font-size: 14px;\n  border: none;\n  cursor: pointer;\n  user-select: none;\n  outline: none;\n  transition: opacity 0.2s, transform 0.2s;\n\n  &:hover:not(:disabled) {\n    background-color: ", ";\n    border: 1px solid ", ";\n  }\n\n  &:focus-visible {\n    background-color: ", ";\n  }\n\n  &:active {\n    transform: scale(0.96);\n  }\n\n  &:disabled {\n    opacity: 0.38;\n    cursor: default;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  border-radius: 50%;\n  background-color: ",
    ";\n  width: 24px;\n  height: 24px;\n  color: ",
    ";\n  font-size: 14px;\n  border: none;\n  cursor: pointer;\n  user-select: none;\n  outline: none;\n  transition: opacity 0.2s, transform 0.2s;\n\n  &:hover:not(:disabled) {\n    background-color: ",
    ";\n    border: 1px solid ", ";\n  }\n\n  &:focus-visible {\n    background-color: ",
    ";\n  }\n\n  &:active {\n    transform: scale(0.96);\n  }\n\n  &:disabled {\n    opacity: 0.38;\n    cursor: default;\n  }\n"])), function (_a) {
    var isActive = _a.isActive, colors = _a.theme.colors;
    return isActive ? colors.primary : 'transparent';
}, function (_a) {
    var isActive = _a.isActive, colors = _a.theme.colors;
    return isActive ? colors.textPrimary : colors.textSecondary;
}, function (_a) {
    var isActive = _a.isActive, colors = _a.theme.colors;
    return !isActive && color_1.hexToRgba(colors.primary, 0.1);
}, function (_a) {
    var colors = _a.theme.colors;
    return colors.primary;
}, function (_a) {
    var isActive = _a.isActive, colors = _a.theme.colors;
    return !isActive && color_1.hexToRgba(colors.primary, 0.2);
});
var PaginationDots = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  list-style: none;\n  user-select: none;\n  opacity: ", ";\n  transition: opacity 0.2s;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  list-style: none;\n  user-select: none;\n  opacity: ", ";\n  transition: opacity 0.2s;\n"])), function (_a) {
    var disabled = _a.disabled;
    return disabled && 0.38;
});
var templateObject_1, templateObject_2, templateObject_3;
