'use client';
"use strict";
exports.__esModule = true;
exports.Tables = void 0;
var react_1 = require("react");
var TableHeader_1 = require("./TableHeader");
var TableBody_1 = require("./TableBody");
var clsx_1 = require("clsx");
exports.Tables = function (_a) {
    var data = _a.data, rowType = _a.rowType, className = _a.className, pageNumber = _a.pageNumber;
    console.log(data, rowType, className, pageNumber);
    var _b = react_1.useState(false), ready = _b[0], setReady = _b[1];
    var _c = react_1.useState(data), tableData = _c[0], setTableData = _c[1];
    // const types: {[key: string]: {data: string, header: string}} = {
    //     'users': {table:'content', header:'users'}
    // }
    react_1.useEffect(function () {
        if (data && data.length > 0) {
            setReady(true);
            setTableData(data);
        }
    }, [data]);
    if (ready) {
        return (react_1["default"].createElement("table", { className: clsx_1["default"](className) },
            react_1["default"].createElement(TableHeader_1.TableHeader, { rowType: rowType }),
            react_1["default"].createElement(TableBody_1.TableBody, { rowType: rowType, data: tableData })));
    }
};
