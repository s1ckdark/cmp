'use client';
"use strict";
exports.__esModule = true;
exports.TableBody = void 0;
var react_1 = require("react");
var index_module_scss_1 = require("./index.module.scss");
exports.TableBody = function (_a) {
    var rowType = _a.rowType, data = _a.data;
    var display = {
        customers: ["memberNo", "memberName", "regionType", "businessRegNo", "customerContacts", "salesContacts"],
        users: ["email", "username", "userType", "privileges", "regName", "regDt", "lasLogDt"]
    };
    var fields = display[rowType] || []; // Fallback to an empty array if tableName not found
    console.log(data);
    return (react_1["default"].createElement("tbody", { className: index_module_scss_1["default"].border }, data.map(function (item, index) { return (react_1["default"].createElement("tr", { key: index, className: index_module_scss_1["default"].textCenter }, fields.map(function (key, keyIndex) {
        return (react_1["default"].createElement("td", { key: keyIndex, className: index_module_scss_1["default"].textCenter }, item[key] || '-'));
    }))); })));
};
