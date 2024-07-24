"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, data, message) => {
    const response = {
        success: statusCode === 200 ? true : false,
        data,
        message,
    };
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
