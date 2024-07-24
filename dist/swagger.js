"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Title",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
        },
    },
    apis: [path_1.default.resolve(__dirname, "routes/*.ts")], // Path to your API route files
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
