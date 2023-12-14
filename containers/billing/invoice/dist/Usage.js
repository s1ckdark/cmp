"use strict";
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
var react_1 = require("react");
var TableHeader_1 = require("@/components/Tables/TableHeader");
var Usage_module_scss_1 = require("./Usage.module.scss");
var recoil_1 = require("recoil");
var invoice_1 = require("@/states/invoice");
var Usage = function () {
    var invoice = recoil_1.useRecoilValue(invoice_1.invoiceView);
    var _a = invoice || {}, data = _a.data, memberNo = _a.memberNo, targetMonth = _a.targetMonth; // Add null check and provide default value
    if (!data) {
        return react_1["default"].createElement("div", null, "Loading...");
    }
    var GroupedDataTable = function (_a) {
        var data = _a.data;
        var productTypes = ['naverProduct', 'gdSw', 'gdMsp'];
        var normalizeData = function (productData, productType) {
            return productData.map(function (item) {
                if (productType === 'gdSw' || productType === 'gdMsp') {
                    return __assign(__assign({}, item), { demandType: item.prodDetailType, region: '-', instanceName: productType === 'gdSw' ? item.prodName + '-' + item.prodDetailTypeStd : item.prodName, process_method: '-', useAmount: item.useAmount, promiseDiscountAmount: item.promiseDiscountamount, memberPriceDiscountAmount: item.memberpricediscountamount, memberPromiseDiscountAddAmount: item.memberpromisediscountadddamount, etcDiscountAmount: item.etcdiscountamount, demandAmount: item.estimateuseAmount, target_start_date: item.target_start_date, target_end_date: item.target_end_date });
                }
                return item;
            });
        };
        var renderProdutType = function (productType) {
            return productType === 'naverProduct' ? '네이버' : '자사';
        };
        var renderProductData = function (productType, productData) {
            var normalizedData = normalizeData(productData, productType);
            var groupedData = normalizedData.reduce(function (acc, item) {
                var demandType = item.demandType;
                acc[demandType] = acc[demandType] || [];
                acc[demandType].push(item);
                console.log(acc);
                return acc;
            }, {});
            var totalRows = normalizedData.length;
            var renderValue = function (item, key) {
                return item[key] !== undefined ? item[key] : '-';
            };
            return (react_1["default"].createElement(react_1["default"].Fragment, null, Object.entries(groupedData).map(function (_a, groupIndex) {
                var demandType = _a[0], items = _a[1];
                return (items.map(function (item, index) { return (react_1["default"].createElement("tr", { key: productType + "-" + demandType + "-" + index + "-" + groupIndex },
                    groupIndex === 0 && index === 0 && (react_1["default"].createElement("td", { rowSpan: totalRows }, renderProdutType(productType))),
                    index === 0 && react_1["default"].createElement("td", { rowSpan: items.length }, renderValue(item, 'service_type')),
                    index === 0 && react_1["default"].createElement("td", { rowSpan: items.length }, demandType),
                    react_1["default"].createElement("td", null, renderValue(item, 'region')),
                    react_1["default"].createElement("td", null, renderValue(item, 'instanceName')),
                    react_1["default"].createElement("td", null, renderValue(item, 'process_method')),
                    react_1["default"].createElement("td", null, renderValue(item, 'useAmount')),
                    react_1["default"].createElement("td", null, renderValue(item, 'promiseDiscountAmount')),
                    react_1["default"].createElement("td", null, renderValue(item, 'memberPriceDiscountAmount')),
                    react_1["default"].createElement("td", null, renderValue(item, 'memberPromiseDiscountAddAmount')),
                    react_1["default"].createElement("td", null, renderValue(item, 'etcDiscountAmount')),
                    react_1["default"].createElement("td", null, renderValue(item, 'demandAmount')),
                    react_1["default"].createElement("td", null, data.target_start_date),
                    react_1["default"].createElement("td", null, data.target_end_date))); }));
            })));
        };
        return (react_1["default"].createElement("table", { className: "table w-full invoiceUsage" },
            react_1["default"].createElement(TableHeader_1.TableHeader, { rowType: 'invoiceUsage' }),
            react_1["default"].createElement("tbody", null, productTypes.map(function (productType) {
                return data[productType] && Array.isArray(data[productType]) ? renderProductData(productType, data[productType]) : null;
            }))));
    };
    return (react_1["default"].createElement("div", { className: Usage_module_scss_1["default"].usage },
        react_1["default"].createElement("hgroup", null,
            react_1["default"].createElement("h1", null, "\uC774\uC6A9\uB0B4\uC5ED")),
        react_1["default"].createElement(GroupedDataTable, { data: data })));
};
exports["default"] = Usage;
