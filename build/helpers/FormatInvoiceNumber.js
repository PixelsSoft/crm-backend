"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatInvoiceNumber(number) {
    var paddingSize = 4; // Adjust the padding size as needed
    return number.toString().padStart(paddingSize, "0");
}
exports.default = formatInvoiceNumber;
