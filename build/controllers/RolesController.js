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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.getAllRoles = exports.createRole = void 0;
var Role_1 = __importDefault(require("../models/Role"));
var ErrorHandler_1 = __importDefault(require("../helpers/ErrorHandler"));
var CustomResponse_1 = __importDefault(require("../helpers/CustomResponse"));
var AsyncHandler_1 = __importDefault(require("../helpers/AsyncHandler"));
exports.createRole = (0, AsyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, access, newRole;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, access = _a.access;
                return [4 /*yield*/, Role_1.default.create({
                        title: title,
                        access: {
                            all: access.all,
                            payout: access.payout,
                            expenses: access.expenses,
                            attendance: access.attendance,
                            users: access.users,
                            projects: access.projects,
                            invoices: access.invoices,
                            customers: access.customers,
                            leads: access.leads,
                        },
                    })];
            case 1:
                newRole = _b.sent();
                return [4 /*yield*/, newRole.save()];
            case 2:
                _b.sent();
                res.status(201).json(new CustomResponse_1.default(newRole, true, "Success"));
                return [2 /*return*/];
        }
    });
}); });
exports.getAllRoles = (0, AsyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Role_1.default.find({})];
            case 1:
                roles = _a.sent();
                res.status(200).json(new CustomResponse_1.default(roles, true));
                return [2 /*return*/];
        }
    });
}); });
exports.deleteRole = (0, AsyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roleId = req.params.id;
                return [4 /*yield*/, Role_1.default.findById(roleId)];
            case 1:
                role = _a.sent();
                if (!role)
                    return [2 /*return*/, next(new ErrorHandler_1.default("Not found", 404))];
                return [4 /*yield*/, role.deleteOne()];
            case 2:
                _a.sent();
                res.status(200).json(new CustomResponse_1.default(null, true, "Role deleted"));
                return [2 /*return*/];
        }
    });
}); });
