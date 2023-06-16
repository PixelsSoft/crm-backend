"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncHandler = function (handler) {
    return function (req, res, next) {
        return Promise.resolve(handler(req, res, next)).catch(next);
    };
};
exports.default = AsyncHandler;
