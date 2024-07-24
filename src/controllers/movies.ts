import { Request, Response } from "express";
import { findMovie, getMovies, updateMovie } from "../services/movies";
import { sendResponse } from "../helpers/response";
import { TMDBResponse } from "../interfaces";

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, genre } = req.query;
        const query = genre ? { genre: genre as string } : {};

        const filters = {
            ...(query && query),
            page: Number(page),
            limit: Number(limit)
        }
      const movies = await getMovies(filters);
      sendResponse(res, 200, movies.response, "Movies Found Successfully");
    } catch (err: any) {
      sendResponse(res, 500, null, err.message);
    }
};

export const addToFavorites = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { action } = req.query;

        if (!['watchlist', 'favorite'].includes(action as string)) {
            return sendResponse(res, 400, null, "Invalid Action Specified!")
        }

        const movie = await findMovie(id)
        if(!movie){
            return sendResponse(res, 404, null, "No Movie exists with this id")
        }

        const url = new URL(`${process.env.TMDB_API_URL}/search/movie`)
        const options: RequestInit = {
            method: "GET",
            headers: {
              accept: "application/json",
              "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
            },
        };

        url.searchParams.append("query", movie.title)
        url.searchParams.append("region", movie.country)
        url.searchParams.append("year", movie.year)

        const response = await fetch(url.toString(), options)

        const formattedResponse = (await response.json()) as TMDBResponse;

        const payloadToUpdate = {
            watchlist: action === "watchlist" ? true : false,
            favorite: action === "favorite" ? true : false,
            overview: formattedResponse.overview,
            popularity: formattedResponse.popularity,
            voteCount: formattedResponse.vote_count
        }

        const updatedMovie = await updateMovie(payloadToUpdate, id)
        if(!updatedMovie || !updatedMovie?._id){
            return sendResponse(res, 400, null, "Error Updating Movie Information")
        }

        return sendResponse(res, 200, updatedMovie, `Movie Added to ${action}`)

    }
    catch(err: any){
        sendResponse(res, 500, null, err.message);
    }
}