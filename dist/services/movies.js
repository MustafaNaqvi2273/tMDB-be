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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.findMovie = exports.getMovies = void 0;
const movies_1 = require("../models/movies");
const getMovies = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield movies_1.moviesModel
        .find(filters.query || {})
        .limit(filters.limit)
        .skip((filters.page - 1) * filters.limit);
    const count = movies_1.moviesModel.countDocuments(filters.query);
    return {
        response,
        count,
    };
});
exports.getMovies = getMovies;
const findMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield movies_1.moviesModel.findOne({ _id: id });
    return response;
});
exports.findMovie = findMovie;
const updateMovie = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield movies_1.moviesModel.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
});
exports.updateMovie = updateMovie;
