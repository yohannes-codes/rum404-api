import { Request as Req, Response as Res, NextFunction as Nxf } from "express";
import { RespondWith } from "../model/app-response";
import { HTTPStatusCodes } from "../constants/https";
import { ErrorTypes } from "../constants/errors";

export function notFoundHandlerMiddleware(req: Req, res: Res, _: Nxf) {
  /* istanbul ignore next */
  RespondWith.error(
    res,
    HTTPStatusCodes.NotFound,
    `the requested URL [${req.method}]${req.originalUrl} does not exist.`,
    [
      {
        type: ErrorTypes.PageNotFound,
        details: {
          method: req.method,
          url: req.originalUrl,
          message: `the requested URL [${req.method}]${req.originalUrl} does not exist.`,
          suggestion:
            "please check the path and ensure you are using the correct HTTP method (GET, POST, PUT, DELETE, etc.).  please check the URL and try again.",
        },
      },
    ]
  );
}
