"use strict";
exports.__esModule = true;
// components/Breadcrumb.tsx
var link_1 = require("next/link");
var index_module_scss_1 = require("./index.module.scss");
var svgs_1 = require("@/public/svgs");
var Breadcrumb = function (_a) {
    var title = _a.title, breadcrumbs = _a.breadcrumbs;
    return (React.createElement("hgroup", null,
        React.createElement("h2", { className: "text-4xl font-extrabold dark:text-white" }, title),
        React.createElement("nav", { className: index_module_scss_1["default"].navi + " mb-10 flex", "aria-label": "Breadcrumb" },
            React.createElement("ol", { className: "inline-flex items-center space-x-1 md:space-x-3" }, breadcrumbs.map(function (breadcrumb, index) { return (React.createElement("li", { className: "inline-flex items-center", key: breadcrumb.href },
                index !== 0 ? React.createElement(svgs_1.BreadcrumbArrow, null) : React.createElement(svgs_1.BreadcrumbHome, null),
                React.createElement(link_1["default"], { href: breadcrumb.href, className: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white" }, breadcrumb.label))); })))));
};
exports["default"] = Breadcrumb;
