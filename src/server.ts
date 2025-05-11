import http from "http";
import dotenv from "dotenv";
import { app } from "./app";

/* istanbul ignore next */
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(
    `Running 🌐: http://localhost:${PORT} ⌚: ${new Date().toJSON()}`
  );
});

export const destroyServer = async () => {
  // await closeDbConnection();
  console.log(`💾 db connection closed 🕒 ${new Date().toISOString()}`);
  console.log(`🖥️ server destroyed 🕒 ${new Date().toISOString()}`);
  server.close();
};

process.on("SIGINT", async () => {
  await destroyServer();
  process.exit(0);
});
