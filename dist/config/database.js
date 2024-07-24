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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbUrl = (_a = process.env.CONNECTION_STRING) !== null && _a !== void 0 ? _a : "";
const dbUser = (_b = process.env.DB_USERNAME) !== null && _b !== void 0 ? _b : "";
const dbPass = (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : "";
const options = {
    user: dbUser,
    pass: dbPass,
};
const createDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUrl, options);
        console.log("Database Connected!");
    }
    catch (error) {
        console.log("Error connecting Database", error);
        setTimeout(exports.createDBConnection, 5000);
    }
});
exports.createDBConnection = createDBConnection;
