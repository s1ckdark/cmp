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
var react_hook_form_1 = require("react-hook-form");
var RegistrationForm_module_scss_1 = require("./RegistrationForm.module.scss");
var Button_1 = require("@/components/Button");
var RegistrationForm = function () {
    var _a = react_hook_form_1.useForm({
        defaultValues: {
            memberId: '',
            memberName: '',
            memberType: '',
            permission: '',
            password: '',
            contact: '',
            landline: '',
            email: '',
            address1: '',
            address2: '',
            company: ''
        }
    }), control = _a.control, handleSubmit = _a.handleSubmit;
    var onSubmit = function (data) {
        console.log(data);
    };
    return (react_1["default"].createElement("form", { className: "" + RegistrationForm_module_scss_1["default"].template, onSubmit: handleSubmit(onSubmit) },
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "memberId", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uD68C\uC6D0ID:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "memberId", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "text", id: "memberId" }, field, { required: true }));
                } })),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "memberName", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uD68C\uC6D0\uBA85:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "memberName", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "text", id: "memberName" }, field, { required: true }));
                } })),
        react_1["default"].createElement("div", { className: "grid gap-6 mb-6 md:grid-cols-2" },
            react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
                react_1["default"].createElement("label", { htmlFor: "memberType", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uD68C\uC6D0\uC720\uD615:"),
                react_1["default"].createElement(react_hook_form_1.Controller, { name: "memberType", control: control, render: function (_a) {
                        var field = _a.field;
                        return react_1["default"].createElement("input", __assign({ type: "text", id: "memberType" }, field, { required: true }));
                    } })),
            react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
                react_1["default"].createElement("label", { htmlFor: "permission", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uAD8C\uD55C:"),
                react_1["default"].createElement(react_hook_form_1.Controller, { name: "permission", control: control, render: function (_a) {
                        var field = _a.field;
                        return react_1["default"].createElement("input", __assign({ type: "text", id: "permission" }, field, { required: true }));
                    } }))),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uBE44\uBC00\uBC88\uD638:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "password", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "password", id: "password" }, field, { required: true }));
                } }),
            react_1["default"].createElement(Button_1["default"], { type: 'button', className: 'mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white', skin: 'gray' }, "\uC218\uC815")),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "contact", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uC5F0\uB77D\uCC98:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "contact", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "text", id: "contact" }, field, { required: true }));
                } })),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "landline", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uC720\uC120\uC804\uD654:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "landline", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "text", id: "landline" }, field));
                } })),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "email", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uC774\uBA54\uC77C:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "email", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "email", id: "email" }, field, { required: true }));
                } })),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "address", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uC8FC\uC18C:"),
            react_1["default"].createElement("div", { className: "grid gap-6 mb-6 md:grid-cols-2" },
                react_1["default"].createElement(react_hook_form_1.Controller, { name: "address1", control: control, render: function (_a) {
                        var field = _a.field;
                        return react_1["default"].createElement("input", __assign({ type: "text", id: "address1" }, field, { required: true }));
                    } }),
                react_1["default"].createElement(react_hook_form_1.Controller, { name: "address2", control: control, render: function (_a) {
                        var field = _a.field;
                        return react_1["default"].createElement("input", __assign({ type: "text", id: "address2" }, field, { required: true }));
                    } }))),
        react_1["default"].createElement("div", { className: "" + RegistrationForm_module_scss_1["default"].inputGroup },
            react_1["default"].createElement("label", { htmlFor: "company", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-black" }, "\uD68C\uC0AC:"),
            react_1["default"].createElement(react_hook_form_1.Controller, { name: "company", control: control, render: function (_a) {
                    var field = _a.field;
                    return react_1["default"].createElement("input", __assign({ type: "text", id: "company" }, field));
                } })),
        react_1["default"].createElement("div", { className: RegistrationForm_module_scss_1["default"].btnArea + " mt-6" },
            react_1["default"].createElement(Button_1["default"], { type: 'submit', className: 'mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white', skin: 'green' }, "\uC218\uC815"))));
};
exports["default"] = RegistrationForm;
