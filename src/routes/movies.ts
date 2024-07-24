import express from "express";
import { getAllMovies, addToFavorites } from "../controllers/movies";

const router = express.Router();

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
router.get("/", getAllMovies);
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
router.post("/movies/:id", addToFavorites);

export default router;