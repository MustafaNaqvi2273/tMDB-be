import request from "supertest";
import { app } from "..";
import { getMovies } from "../services/movies";
import { sendResponse } from "../helpers/response";

const mockData = {
  response: [
    {
      _id: "1",
      title: "Citizen Kane",
      director: "Welles, Orson",
      year: "1941",
      country: "USA",
      genre: "Drama-Mystery",
    },
    {
      _id: "2",
      title: "Vertigo",
      director: "Hitchcock, Alfred",
      year: "1958",
      country: "USA",
      Length: "128",
      genre: "Thriller-Drama-Mystery",
    },
    {
      _id: "3",
      title: "2001: A Space Odyssey",
      director: "Kubrick, Stanley",
      year: "1968",
      country: "UK-USA",
      Length: "139",
      genre: "Science Fiction",
    },
    {
      _id: "4",
      title: "Tokyo Story",
      director: "Ozu, Yasujiro",
      year: "1953",
      country: "Japan",
      Length: "134",
      genre: "Drama",
    },
  ],
  count: 4,
};

jest.mock("../services/movies");
jest.mock("../helpers/response");

describe("GET /api", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should return 200 and movies list when successful", async () => {
    (getMovies as jest.Mock).mockResolvedValue(mockData);

    (sendResponse as jest.Mock).mockImplementation(
      (res, statusCode, data, message) => {
        res.status(statusCode).json({ data, message });
      }
    );

    const response = await request(app).get("/api?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: mockData.response,
      message: "Movies Found Successfully",
    });
    expect(getMovies).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });

  test("should return 500 if an error occurs", async () => {
    (getMovies as jest.Mock).mockRejectedValue(
      new Error("Something went wrong")
    );

    (sendResponse as jest.Mock).mockImplementation(
      (res, statusCode, data, message) => {
        res.status(statusCode).json({ data, message });
      }
    );

    const response = await request(app).get("/api?page=1&limit=10");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      data: null,
      message: "Something went wrong",
    });
  });
});
