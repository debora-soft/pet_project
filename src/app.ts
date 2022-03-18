import "reflect-metadata";
import env from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {routerUser} from './routes/user.routs'

import { createConnection, Connection } from "typeorm";
//import { File } from "./models/file";
import { User } from "./models/user";

const app = express();
env.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', routerUser);
app.post('/', (req: any, res:any) => {
  console.log(req.body);
  res.send("123")
})

 createConnection()

const PORT = process.env.PORT || 7000;

const start = async () => {
  try {
    app.listen(7000, () => console.log(`Server start on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
