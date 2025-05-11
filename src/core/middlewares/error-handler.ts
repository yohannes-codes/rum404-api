import { Request as Req, Response as Res, NextFunction as Nxf } from "express";
import { RespondWith } from "../model/app-response";
import { HTTPStatusCodes } from "../constants/https";

export function errorHandlerMiddleware(err: any, _: Req, res: Res, __: Nxf) {
  if (err.isLocallyMadeError)
    RespondWith.error(res, err.statusCode, err.message, err.errors);
  else
    RespondWith.error(
      res,
      HTTPStatusCodes.InternalServerError,
      err.message,
      err.errors
    );
}
