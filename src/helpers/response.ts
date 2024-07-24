import { Response } from "express";

type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
};

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T | null,
  message: string
) => {
  const response: ApiResponse<T> = {
    success: statusCode === 200 ? true : false,
    data,
    message,
  };

  res.status(statusCode).json(response);
};