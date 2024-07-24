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
exports.addToFavorites = exports.getAllMovies = void 0;
const movies_1 = require("../services/movies");
const response_1 = require("../helpers/response");
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, genre } = req.query;
        const query = genre ? { genre: genre } : {};
        const filters = Object.assign(Object.assign({}, (query && query)), { page: Number(page), limit: Number(limit) });
        const movies = yield (0, movies_1.getMovies)(filters);
        (0, response_1.sendResponse)(res, 200, movies.response, "Movies Found Successfully");
    }
    catch (err) {
        (0, response_1.sendResponse)(res, 500, null, err.message);
    }
});
exports.getAllMovies = getAllMovies;
const addToFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { action } = req.query;
        if (!['watchlist', 'favorite'].includes(action)) {
            return (0, response_1.sendResponse)(res, 400, null, "Invalid Action Specified!");
        }
        const movie = yield (0, movies_1.findMovie)(id);
        if (!movie) {
            return (0, response_1.sendResponse)(res, 404, null, "No Movie exists with this id");
        }
        const url = new URL(`${process.env.TMDB_API_URL}/search/movie`);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
            },
        };
        url.searchParams.append("query", movie.title);
        url.searchParams.append("region", movie.country);
        url.searchParams.append("year", movie.year);
        const response = yield fetch(url.toString(), options);
        const formattedResponse = (yield response.json());
        const payloadToUpdate = {
            watchlist: action === "watchlist" ? true : false,
            favorite: action === "favorite" ? true : false,
            overview: formattedResponse.overview,
            popularity: formattedResponse.popularity,
            voteCount: formattedResponse.vote_count
        };
        const updatedMovie = yield (0, movies_1.updateMovie)(payloadToUpdate, id);
        if (!updatedMovie || !(updatedMovie === null || updatedMovie === void 0 ? void 0 : updatedMovie._id)) {
            return (0, response_1.sendResponse)(res, 400, null, "Error Updating Movie Information");
        }
        return (0, response_1.sendResponse)(res, 200, updatedMovie, `Movie Added to ${action}`);
    }
    catch (err) {
        (0, response_1.sendResponse)(res, 500, null, err.message);
    }
});
exports.addToFavorites = addToFavorites;
