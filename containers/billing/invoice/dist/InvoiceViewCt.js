'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Breadcrumb_1 = require("@/components/Breadcrumb");
var react_1 = require("react");
var services_1 = require("@/services");
var InfoSection_1 = require("./InfoSection");
var Usage_1 = require("./Usage");
var Summary_1 = require("./Summary");
var PdfExport_1 = require("@/components/PdfExport");
var Button_1 = require("@/components/Button");
var recoil_1 = require("recoil");
var invoice_1 = require("@/states/invoice");
var InvoiceViewCt = function (_a) {
    var memberNo = _a.memberNo, targetMonth = _a.targetMonth;
    var _b = recoil_1.useRecoilState(invoice_1.invoiceView), invoice = _b[0], setInvoice = _b[1];
    var breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: 'Billing' },
        { href: "/billing/invoice/" + memberNo + "/" + targetMonth, label: 'List' }
    ];
    var handlePdf = function (id) {
        PdfExport_1.PdfExport(id);
    };
    react_1.useEffect(function () {
        var fetching = function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/invoice/" + memberNo + "/" + targetMonth;
                        return [4 /*yield*/, services_1.apiBe.get(url)];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200)
                            setInvoice({ data: response.data, memberNo: memberNo, targetMonth: targetMonth });
                        return [2 /*return*/];
                }
            });
        }); };
        fetching();
    }, [memberNo, targetMonth]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Breadcrumb_1["default"], { title: memberNo, breadcrumbs: breadcrumbs }),
        react_1["default"].createElement("div", { id: "invoice" },
            react_1["default"].createElement(InfoSection_1["default"], { type: "supply", memberNo: memberNo }),
            react_1["default"].createElement(InfoSection_1["default"], { type: "client", memberNo: memberNo }),
            react_1["default"].createElement(Usage_1["default"], null),
            react_1["default"].createElement(Summary_1["default"], null)),
        react_1["default"].createElement(Button_1["default"], { onClick: function () { return handlePdf('invoice'); }, className: "flex justify-end mt-10", skin: "green" }, "pdf")));
};
exports["default"] = InvoiceViewCt;
