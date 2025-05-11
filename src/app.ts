import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { notFoundHandlerMiddleware } from "./core/middlewares/not-found-handler";
import { errorHandlerMiddleware } from "./core/middlewares/error-handler";
import { RespondWith } from "./core/model/app-response";
import { HTTPStatusCodes } from "./core/constants";

export const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

// Health check
app.all("/", (_: Request, res: Response) => {
  RespondWith.success(
    res,
    HTTPStatusCodes.OK,
    "Fantastic news! The test ran successfully! 🎉 Everything is working perfectly!",
    {
      project: "hotel management system",
      coder: {
        name: "yohannes tesfay",
        dateOfBirth: new Date("03 April 1999 16:30"),
        netWorth: 0,
      },
    }
  );
});

// Test route (only in dev)
if (process.env.NODE_ENV !== "production") {
  app.all(
    "/api/v1/onlyForTheSakeOfTesting",
    (_req: Request, _res: Response, next: NextFunction) => {
      next({
        message: "This route is only for the sake of testing",
        isLocallyMadeError: false,
        statusCode: HTTPStatusCodes.InternalServerError,
      });
    }
  );
}

// TODO: app.use("/api/v1/rooms", roomsRoutes);

app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);
