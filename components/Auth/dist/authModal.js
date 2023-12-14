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
var react_hook_form_1 = require("react-hook-form");
var yup_1 = require("@hookform/resolvers/yup");
var useAuth_1 = require("@/hooks/useAuth");
var recoil_1 = require("recoil");
var validator_1 = require("@/utils/validator");
var states_1 = require("./states");
var useAuthModal_1 = require("./useAuthModal");
var Button_1 = require("@/components/Button");
var Modal_1 = require("@/components/Modal");
var index_module_scss_1 = require("./index.module.scss");
var AuthModal = function () {
    var _a = useAuthModal_1["default"](), authModal = _a.authModal, onClose = _a.onClose;
    var showPassword = recoil_1.useRecoilValue(states_1.showPasswordAtom);
    var _b = useAuth_1["default"](), logInEmail = _b.logInEmail, logInLoading = _b.logInLoading, logInError = _b.logInError;
    var methods = react_hook_form_1.useForm({ mode: 'onBlur', resolver: yup_1.yupResolver(validator_1.logInValidator) });
    var handleSubmit = methods.handleSubmit, register = methods.register, errors = methods.formState.errors;
    var submitLogIn = handleSubmit(function (formValues) {
        logInEmail(formValues.email, formValues.password);
    });
    var onSignIn = function (e) {
        e.preventDefault();
        submitLogIn();
    };
    var errorMessage = Object.values(errors).length > 0 ? Object.values(errors)[0].message : undefined;
    var disabled = logInLoading;
    return (React.createElement(Modal_1.Modal, { isShow: !!authModal, onClose: onClose, closeIcon: true },
        React.createElement("div", { className: index_module_scss_1["default"].authModal },
            React.createElement("form", { onSubmit: onSignIn },
                React.createElement("div", { className: index_module_scss_1["default"].inputWrapper },
                    React.createElement("input", __assign({}, register('email'), { type: 'string', placeholder: '\uC774\uBA54\uC77C', disabled: disabled }))),
                React.createElement("div", { className: index_module_scss_1["default"].inputWrapper },
                    React.createElement("input", __assign({}, register('password'), { type: showPassword ? 'string' : 'password', placeholder: '\uBE44\uBC00\uBC88\uD638 (6\uAE00\uC790 \uC774\uC0C1)', autoComplete: 'off', disabled: disabled }))),
                React.createElement(Button_1["default"], { type: 'submit', disabled: disabled, skin: 'primary' }, "\uB85C\uADF8\uC778"),
                (logInError || errorMessage) && React.createElement("div", { className: index_module_scss_1["default"].commonError }, logInError || errorMessage)))));
};
exports["default"] = AuthModal;
