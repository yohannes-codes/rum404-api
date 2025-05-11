import { Response } from "express";
import { ErrorTypes } from "../constants/errors";
import { HTTPStatusCodes } from "../constants/https";

export interface AppError<T = any> {
  type: ErrorTypes;
  details?: T;
}

export interface AppValidationError
  extends AppError<{
    keyValue: { [key: string]: any };
    message: string;
    hint?: any;
  }> {}

export interface AppResponse<T = null> {
  success: boolean;
  statusCode: HTTPStatusCodes;
  message: string;
  data?: T;
  errors?: AppError[];
  moreInfo?: any;
}

export const RespondWith = {
  success<T>(
    res: Response,
    statusCode: HTTPStatusCodes,
    message: string,
    data: T,
    moreInfo?: { [key: string]: any }
  ): void {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      moreInfo,
    } as AppResponse<T>);
  },
  error(
    res: Response,
    statusCode: HTTPStatusCodes,
    message: string,
    errors: AppError[],
    moreInfo?: { [key: string]: any }
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors: errors || [],
      moreInfo,
    } as AppResponse<null>);
  },
};
