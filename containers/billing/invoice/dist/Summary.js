"use strict";
exports.__esModule = true;
var recoil_1 = require("recoil");
var invoice_1 = require("@/states/invoice"); // Import your Recoil state
var Summary_module_scss_1 = require("./Summary.module.scss");
var data_1 = require("@/utils/data");
var Summary = function () {
    var invoice = recoil_1.useRecoilValue(invoice_1.invoiceView);
    var _a = invoice || {}, data = _a.data, memberNo = _a.memberNo, targetMonth = _a.targetMonth; // Add null check and provide default value
    var naverSummary = data.naverSummary, result = data.result;
    if (!data) {
        return React.createElement("div", null, "Loading..."); // Or any other loading indicator
    }
    return (React.createElement("div", { className: Summary_module_scss_1["default"].summary },
        React.createElement("hgroup", null,
            React.createElement("h1", null, "\uCD1D\uACC4")),
        React.createElement("table", { className: "w-full table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { rowSpan: 6 }, "\uC6D4\uC804\uCCB4 \uD569\uACC4"),
                    React.createElement("th", { colSpan: 2 }, "\uC774\uC6A9\uAE08\uC561")),
                React.createElement("tr", null,
                    React.createElement("th", { rowSpan: 4 }, "\uD560\uC778\uAE08\uC561"),
                    React.createElement("th", null, "\uC57D\uC815")),
                React.createElement("tr", null,
                    React.createElement("th", null, "\uD68C\uC6D0\uC694\uAE08\uC81C")),
                React.createElement("tr", null,
                    React.createElement("th", null, "\uD68C\uC6D0\uC57D\uC815\uC694\uAE08\uC81C")),
                React.createElement("tr", null,
                    React.createElement("th", null, "\uAE30\uD0C0")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 2 }, "\uB0A9\uBD80\uC608\uC0C1\uAE08\uC561")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uD06C\uB808\uB527\uD560\uC778")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uD06C\uB808\uB527\uD560\uC778")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uC0C1\uD488\uD560\uC778")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uACE0\uAC1D\uD560\uC778")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uCF54\uC778 \uC0AC\uC6A9\uAE08\uC561")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "100\uC6D0\uBBF8\uB9CC\uD560\uC778")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uC138\uC804")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uBD80\uAC00\uC138")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uC57D\uC815\uD574\uC9C0 \uC704\uC57D\uAE08(\uBD80\uAC00\uC138 \uBA74\uC81C\uD56D\uBAA9)")),
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 3 }, "\uC2E4\uCCAD\uAD6C \uC694\uAE08"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "useAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(naverSummary, "promiseDiscountAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(naverSummary, "memberPriceDiscountAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(naverSummary, "memberPromiseDiscountAddAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "etcDiscountAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "estimateUseAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "useAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "productDiscountAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "customerDiscountAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "coinUseAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "rounddownDiscountAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "overduePlusAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "thisMonthDemandAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "thisMonthVatAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "defaultAmount"))),
                React.createElement("tr", null,
                    React.createElement("td", null, data_1.isObjKeyExist(result, "totalDemandAmount")))))));
};
exports["default"] = Summary;
