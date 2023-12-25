"use strict";
exports.__esModule = true;
var react_1 = require("react");
var auth_1 = require("@/states/auth");
var states_1 = require("./states");
var recoil_1 = require("recoil");
var useAuthModal = function () {
    var authModal = recoil_1.useRecoilValue(states_1.authModalStateAtom);
    var resetAuthModal = recoil_1.useResetRecoilState(states_1.authModalStateAtom);
    var resetLogInError = recoil_1.useResetRecoilState(auth_1.logInErrorAtom);
    var resetSignUpError = recoil_1.useResetRecoilState(auth_1.signUpErrorAtom);
    var onClose = react_1.useCallback(function () {
        resetAuthModal();
        resetLogInError();
        resetSignUpError();
    }, [resetAuthModal, resetLogInError, resetSignUpError]);
    return {
        onClose: onClose,
        authModal: authModal
    };
};
exports["default"] = useAuthModal;
