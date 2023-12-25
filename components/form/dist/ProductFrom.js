'use client';
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
var ProductForm = function () {
    var initialFormData = {
        productName: '',
        productCategory: '',
        productSubCategory: '',
        officialPrice: 0,
        vendorSalesName: '',
        vendorSalesContact: '',
        vendorSalesEmail: '',
        comment: ''
    };
    var _a = react_1.useState(initialFormData), formData = _a[0], setFormData = _a[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        console.log(formData);
    };
    return (React.createElement("form", { action: "#", method: "post" },
        React.createElement("label", { htmlFor: "productName" }, "\uC0C1\uD488\uBA85:"),
        React.createElement("input", { type: "text", id: "productName", name: "productName" }),
        React.createElement("label", { htmlFor: "productCategory" }, "\uC0C1\uD488\uBD84\uB958:"),
        React.createElement("input", { type: "text", id: "productCategory", name: "productCategory" }),
        React.createElement("label", { htmlFor: "productSubCategory" }, "\uC0C1\uD488\uC0C1\uC138\uBD84\uB958:"),
        React.createElement("input", { type: "text", id: "productSubCategory", name: "productSubCategory" }),
        React.createElement("label", { htmlFor: "officialPrice" }, "\uC815\uC2DD\uB2E8\uAC00:"),
        React.createElement("input", { type: "number", id: "officialPrice", name: "officialPrice" }),
        React.createElement("label", { htmlFor: "vendorSalesName" }, "\uBCA4\uB354\uC0AC \uC601\uC5C5 \uC774\uB984:"),
        React.createElement("input", { type: "text", id: "vendorSalesName", name: "vendorSalesName" }),
        React.createElement("label", { htmlFor: "vendorSalesContact" }, "\uBCA4\uB354\uC0AC \uC601\uC5C5 \uC5F0\uB77D\uCC98:"),
        React.createElement("input", { type: "text", id: "vendorSalesContact", name: "vendorSalesContact" }),
        React.createElement("label", { htmlFor: "vendorSalesEmail" }, "\uBCA4\uB354\uC0AC \uC601\uC5C5 \uC774\uBA54\uC77C:"),
        React.createElement("input", { type: "email", id: "vendorSalesEmail", name: "vendorSalesEmail" }),
        React.createElement("label", { htmlFor: "comment" }, "\uCF54\uBA58\uD2B8:"),
        React.createElement("textarea", { id: "comment", name: "comment", rows: "4", cols: "50" }),
        React.createElement("input", { type: "submit", value: "\uC81C\uCD9C" })));
};
exports["default"] = ProductForm;
