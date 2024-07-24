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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const movies_1 = require("../models/movies");
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const filePath = path_1.default.join(__dirname, '../../BackendData.csv');
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => results.push(data))
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const formattedData = results.map((result) => ({
                title: result.Title,
                director: result.Director,
                year: result.Year,
                country: result.Country,
                genre: result.Genre
            }));
            yield movies_1.moviesModel.insertMany(formattedData);
            console.log('Data successfully seeded');
        }
        catch (error) {
            console.error('Error seeding data:', error);
        }
    }));
});
exports.seedData = seedData;
