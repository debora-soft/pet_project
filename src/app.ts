import "reflect-metadata";
import env from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import DB from "mysql2";

import { createConnection, Connection } from "typeorm";
import { File } from "./models/file";

const app = express();
env.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

createConnection({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "zimad_test",
  entities: [File],
  synchronize: true,
})
  .then((connection) => {
    console.log("Connection to the database with TypeORM has occurred");
  })
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    app.listen(3500, () => console.log(`Server start on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
