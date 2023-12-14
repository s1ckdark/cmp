"use strict";
exports.__esModule = true;
var CountUpAnimation_1 = require("@/components/d3/CountUpAnimation");
var LineChart_1 = require("@/components/d3/LineChart");
var BarChart_1 = require("@/components/d3/BarChart");
var DonutChart_1 = require("@/components/d3/DonutChart");
var index_module_scss_1 = require("./index.module.scss");
var BillingPage = function (_a) {
    var top10 = _a.top10, billing = _a.billing, support = _a.support, announce = _a.announce, dData1 = _a.dData1, dData2 = _a.dData2, lineChartData = _a.lineChartData;
    return (React.createElement("div", { className: index_module_scss_1["default"].container + " min-h-screen" },
        React.createElement("div", { className: "w-full flex items-center justify-center flex-wrap" },
            React.createElement("div", { className: index_module_scss_1["default"].box_section + " prevMonth flex items-center justify-center flex-col w-1/2" },
                React.createElement("h2", null, "\uC804\uC6D0 \uC804\uCCB4 \uB9E4\uCD9C"),
                React.createElement("div", { className: "whole" },
                    React.createElement("label", null, "\uC804\uCCB4\uACE0\uAC1D\uC0AC"),
                    React.createElement("div", null,
                        React.createElement(CountUpAnimation_1["default"], { endValue: 380320636, duration: 500 }))),
                React.createElement("div", { className: "supervised" },
                    React.createElement("label", null, "\uB2F4\uB2F9\uACE0\uAC1D\uC0AC"),
                    React.createElement("div", null,
                        React.createElement(CountUpAnimation_1["default"], { endValue: 65320636, duration: 500 })))),
            React.createElement("div", { className: index_module_scss_1["default"].box_section + " currentMonth flex items-center justify-center flex-col text-left w-1/2" },
                React.createElement("h2", null, "\uB2F9\uC6D4 \uC804\uCCB4 \uB9E4\uCD9C"),
                React.createElement("div", { className: "whole" },
                    React.createElement("label", null, "\uC804\uCCB4\uACE0\uAC1D\uC0AC"),
                    React.createElement("div", null,
                        React.createElement(CountUpAnimation_1["default"], { endValue: 584320636, duration: 500 }))),
                React.createElement("div", { className: "supervised" },
                    React.createElement("label", null, "\uB2F4\uB2F9\uACE0\uAC1D\uC0AC"),
                    React.createElement("div", null,
                        React.createElement(CountUpAnimation_1["default"], { endValue: 110320800, duration: 500 }))))),
        React.createElement("div", { className: index_module_scss_1["default"].box_section + " period_sales flex items-center justify-center flex-wrap" },
            React.createElement("h2", null, "\uC6D4\uBCC4 \uB9E4\uCD9C"),
            React.createElement(LineChart_1["default"], { data: lineChartData, width: "950", height: "300" }),
            React.createElement("div", { className: "flex justify-center items-center" },
                React.createElement("div", { className: "supervised w-1/2" }),
                React.createElement("div", { className: "whole w-1/2" })),
            React.createElement("div", { className: index_module_scss_1["default"].box_section + " period_sales flex items-center justify-center flex-wrap" },
                React.createElement("h2", null, "\uB9E4\uCD9C TOP10"),
                React.createElement("div", { className: "flex justify-center items-center" },
                    React.createElement("div", { className: "whole w-1/2" },
                        React.createElement("div", { className: "bg-gray-500 text-center" }, "\uC804\uCCB4 \uACE0\uAC1D\uC0AC")),
                    React.createElement("div", { className: "supervised w-1/2" },
                        React.createElement("div", { className: "bg-gray-500 text-center" }, "\uB2F4\uB2F9 \uACE0\uAC1D\uC0AC"))))),
        React.createElement("div", { className: "service_usage" },
            React.createElement("div", { className: index_module_scss_1["default"].box_section + " period_sales flex items-center justify-center flex-wrap" },
                React.createElement("h2", null, "\uC11C\uBE44\uC2A4\uBCC4 \uC774\uC6A9\uB960"),
                React.createElement("div", { className: "flex justify-center items-center" },
                    React.createElement("div", { className: "whole w-1/2" },
                        React.createElement(DonutChart_1["default"], { data: dData1, title: "전체 서비스" })),
                    React.createElement("div", { className: "supervised w-1/2" },
                        React.createElement(DonutChart_1["default"], { data: dData2, title: "담당 서비스" }))))),
        React.createElement("div", { className: "service_usage" },
            React.createElement("div", { className: index_module_scss_1["default"].box_section + " period_sales flex items-center justify-center flex-wrap" },
                React.createElement("h2", null, "\uC11C\uBE44\uC2A4\uBCC4 \uC774\uC6A9\uB960"),
                React.createElement("div", { className: "flex justify-center items-center" },
                    React.createElement("div", { className: "whole w-4/5" },
                        React.createElement(BarChart_1["default"], { data: billing, title: "월간 이용 추이", width: "100%", height: "500px" })),
                    React.createElement("div", { className: "supervised w-1/5" },
                        React.createElement(BarChart_1["default"], { data: billing, title: "월간 이용 추이", width: "100%", height: "500px" })))))));
};
exports["default"] = BillingPage;
