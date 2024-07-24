"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = require("../controllers/movies");
const router = express_1.default.Router();
/**
 * @swagger
 * /api:
 *  get:
 *    summary: GET ALL MOVIES
 *    description: Returns a list of all movies
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json
 */
router.get("/", movies_1.getAllMovies);
/**
 * @swagger
 * /api/movies/{id}:
 *  get:
 *    summary: ADD SPECIFIC MOVIE TO WATCHLIST OR FAVORITES
 *    description: Adds the movie to the list and updates the movie data
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID of the movie
 *        required: true
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json
 */
router.post("/movies/:id", movies_1.addToFavorites);
exports.default = router;
