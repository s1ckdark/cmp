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
var react_hook_form_1 = require("react-hook-form");
var yup_1 = require("@hookform/resolvers/yup");
var recoil_1 = require("recoil");
var useAuth_1 = require("@/hooks/useAuth");
var states_1 = require("./states");
var validator_1 = require("@/utils/validator");
var index_module_scss_1 = require("./index.module.scss");
var Button_1 = require("@/components/Button");
var LogIn = function () {
    var _a = useAuth_1["default"](), logInEmail = _a.logInEmail, logInLoading = _a.logInLoading, logInError = _a.logInError;
    var methods = react_hook_form_1.useForm({ mode: 'onBlur', resolver: yup_1.yupResolver(validator_1.logInValidator) });
    var handleSubmit = methods.handleSubmit, register = methods.register, errors = methods.formState.errors;
    var _b = recoil_1.useRecoilState(states_1.showPasswordAtom), showPassword = _b[0], setShowPassword = _b[1];
    var submitLogIn = handleSubmit(function (formValues) {
        logInEmail(formValues.email, formValues.password);
    });
    var onSignIn = function (e) {
        e.preventDefault();
        submitLogIn();
    };
    var errorMessage = Object.values(errors).length > 0 ? Object.values(errors)[0].message : undefined;
    var disabled = logInLoading;
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: onSignIn },
            React.createElement("div", { className: "flex flex-wrap mb-3 " + index_module_scss_1["default"].inputField },
                React.createElement("label", { className: "inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600" }, "ID"),
                React.createElement("input", __assign({}, register("email", { required: true }), { type: 'string', placeholder: '\uC774\uBA54\uC77C', 
                    // disabled={disabled}
                    className: index_module_scss_1["default"].input_id + " rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" })),
                errors.email && React.createElement("span", { className: "w-full" }, "This field is required")),
            React.createElement("div", { className: "flex flex-wrap mb-3 " + index_module_scss_1["default"].inputField },
                React.createElement("label", { className: "inline-flex items-center px-3  justify-center text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600" }, "PW"),
                React.createElement("input", __assign({}, register("password", { required: true }), { type: showPassword ? 'text' : 'password', placeholder: '\uBE44\uBC00\uBC88\uD638 (6\uAE00\uC790 \uC774\uC0C1)', autoComplete: 'off', 
                    // disabled={disabled}
                    className: index_module_scss_1["default"].input_password + " rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" })),
                errors.password && React.createElement("span", { className: "w-full" }, "This field is required")),
            React.createElement("div", { className: "mb-10" },
                React.createElement(Button_1["default"], { type: 'submit', className: index_module_scss_1["default"].btnLogin + " px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white", disabled: disabled, skin: 'green' }, "LOGIN")),
            (logInError || errorMessage) && React.createElement("div", { className: index_module_scss_1["default"].commonError }, logInError || errorMessage))));
};
exports["default"] = LogIn;
