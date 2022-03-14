import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8000



const app = express();
const start = async () => {
  try {
      app.listen(3500, () => console.log(`Server start on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start()