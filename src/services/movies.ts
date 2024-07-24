import { Filters } from "../interfaces";
import { moviesModel } from "../models/movies";
import { Movies } from "../models/movies";

export const getMovies = async (filters: Filters) => {
  const response = await moviesModel
    .find(filters.query || {})
    .limit(filters.limit)
    .skip((filters.page - 1) * filters.limit);

  const count = moviesModel.countDocuments(filters.query);

  return {
    response,
    count,
  };
};

export const findMovie = async(id: string) => {
    const response = await moviesModel.findOne({ _id: id })
    return response;
}

export const updateMovie = async(data: Partial<Movies>, id: string) => {
    const response = await moviesModel.findOneAndUpdate({ _id: id }, data, { new: true })

    return response;
}
