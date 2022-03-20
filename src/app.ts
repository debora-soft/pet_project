import "reflect-metadata";
import env from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {routerUser} from './routes/user.routs'
import multer from "multer";


import { createConnection} from "typeorm";



const app = express();
env.config();

app.use(express.static(__dirname));
// app.use(multer({ dest: "uploads" }).single("filedata"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', routerUser);

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
