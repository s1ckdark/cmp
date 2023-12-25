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
var InfoSection_module_scss_1 = require("./InfoSection.module.scss");
var react_1 = require("react");
var recoil_1 = require("recoil");
var services_1 = require("@/services");
var invoice_1 = require("@/states/invoice"); // Import your Recoil state
var InfoSection = function (_a) {
    var type = _a.type, memberNo = _a.memberNo;
    var invoice = recoil_1.useRecoilValue(invoice_1.invoiceView);
    var _b = react_1.useState([]), customer = _b[0], setCustomer = _b[1];
    var title = type === 'supply' ? '공급자' : '수신자';
    react_1.useEffect(function () {
        var fetching = function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/customer/" + memberNo;
                        return [4 /*yield*/, services_1.apiBe.get(url)];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200)
                            setCustomer(response.data);
                        return [2 /*return*/];
                }
            });
        }); };
        fetching();
    }, [memberNo]);
    return (react_1["default"].createElement("div", { className: "" + InfoSection_module_scss_1["default"].infoSection },
        react_1["default"].createElement("div", { className: type + "__info" },
            react_1["default"].createElement("hgroup", null,
                react_1["default"].createElement("h1", null, title)),
            react_1["default"].createElement("div", { className: type + "__info--name" },
                react_1["default"].createElement("label", null, "\uC0C1\uD638\uBA85"),
                react_1["default"].createElement("span", null, customer.memberName)),
            react_1["default"].createElement("div", { className: type + "__info--ceo" },
                react_1["default"].createElement("label", null, "\uB300\uD45C\uC790"),
                react_1["default"].createElement("span", null, customer.custCeo)),
            react_1["default"].createElement("div", { className: type + "__info--license" },
                react_1["default"].createElement("label", null, "\uC0AC\uC5C5\uC790 \uB4F1\uB85D\uBC88\uD638"),
                react_1["default"].createElement("span", null, customer.businessRegNo)),
            react_1["default"].createElement("div", { className: type + "__info--address" },
                react_1["default"].createElement("label", null, "\uC8FC\uC18C"),
                react_1["default"].createElement("span", null, customer.address ? customer.address[0].addr + ' ' + customer.address[0].addrDetail : '  ')),
            react_1["default"].createElement("div", { className: type + "__info--phone" },
                react_1["default"].createElement("label", null, "\uC804\uD654"),
                react_1["default"].createElement("span", null, customer.custPhone)))));
};
exports["default"] = InfoSection;
