"use strict";
exports.__esModule = true;
exports.showPasswordAtom = exports.authModalStateAtom = void 0;
var recoil_1 = require("recoil");
exports.authModalStateAtom = recoil_1.atom({
    key: 'authModalState',
    "default": undefined
});
exports.showPasswordAtom = recoil_1.atom({
    key: 'showPasswordState',
    "default": false
});
