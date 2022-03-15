import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DB from 'mysql2';
import 'reflect-metadata';

const app = express();
env.config()
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const connection = DB.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'zimad_test'
});
connection.connect((err) => {
  if(err){
    console.log(err);
  } 
  else{
    console.log('Connection to the database has occurred');
  }
});

const PORT = process.env.PORT || 8000




const start = async () => {
  try {
      app.listen(3500, () => console.log(`Server start on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start()