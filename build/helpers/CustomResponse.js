"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomResponse = /** @class */ (function () {
    function CustomResponse(data, success, message) {
        if (message === void 0) { message = null; }
        this.data = data;
        this.success = success;
        this.message = message;
    }
    return CustomResponse;
}());
exports.default = CustomResponse;
