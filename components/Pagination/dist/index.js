"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var gr_1 = require("react-icons/gr");
var ai_1 = require("react-icons/ai");
var usePagination_1 = require("@/hooks/usePagination");
var Navigation = styled_components_1["default"].nav(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var Button = styled_components_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: ", ";\n  border: 0;\n  margin: 0;\n  padding: 8px 12px;\n  font-size: 16px;\n  font-weight: normal;\n  background-color: ", ";\n  cursor: pointer;\n  border-radius: 100%;\n  width: 48px;\n  height: 48px;\n\n  &:hover {\n    background-color: #ccc;\n    color: #fff;\n  }\n  &:active {\n    opacity: 0.8;\n  }\n"], ["\n  color: ", ";\n  border: 0;\n  margin: 0;\n  padding: 8px 12px;\n  font-size: 16px;\n  font-weight: normal;\n  background-color: ", ";\n  cursor: pointer;\n  border-radius: 100%;\n  width: 48px;\n  height: 48px;\n\n  &:hover {\n    background-color: #ccc;\n    color: #fff;\n  }\n  &:active {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var selected = _a.selected;
    return (selected ? "#fff" : "#000");
}, function (_a) {
    var selected = _a.selected;
    return (selected ? "#36dafa" : "#fff");
});
var Item = styled_components_1["default"].li(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var ItemList = styled_components_1["default"].ul(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  list-style: none;\n  ", " + ", " {\n    margin-left: 8px;\n  }\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  list-style: none;\n  ", " + ", " {\n    margin-left: 8px;\n  }\n"])), Item, Item);
var Pagination = function (_a) {
    var count = _a.count, page = _a.page, onPageChange = _a.onPageChange, disabled = _a.disabled, siblingCount = _a.siblingCount, boundaryCount = _a.boundaryCount;
    var getLabel = function (item) {
        if (typeof item === "number")
            return item;
        else if (item.indexOf("ellipsis") > -1)
            return react_1["default"].createElement(ai_1.AiOutlineEllipsis, null);
        else if (item.indexOf("prev") > -1)
            return react_1["default"].createElement(gr_1.GrFormPrevious, null);
        else if (item.indexOf("next") > -1)
            return react_1["default"].createElement(gr_1.GrFormNext, null);
    };
    var items = usePagination_1["default"]({
        count: count,
        page: page,
        onPageChange: onPageChange,
        disabled: disabled,
        siblingCount: siblingCount,
        boundaryCount: boundaryCount
    }).items;
    return (react_1["default"].createElement(Navigation, null,
        react_1["default"].createElement(ItemList, null, items.map(function (_a) {
            var key = _a.key, disabled = _a.disabled, selected = _a.selected, onClick = _a.onClick, item = _a.item;
            return (react_1["default"].createElement(Item, { key: key },
                react_1["default"].createElement(Button, { disabled: disabled, selected: selected, onClick: onClick }, getLabel(item))));
        }))));
};
exports["default"] = Pagination;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
