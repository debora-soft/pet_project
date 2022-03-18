import  express from "express";
import { userControllers } from "../controllers/userControlers";
import { body } from "express-validator";

interface loginData {
  id: string,
  password: string
}


export const routerUser = express.Router();

const controller = new userControllers()

routerUser.post('/registration', body("id").isString(), body("password").isString(), controller.registration);
routerUser.post('/login', body("id").isString(), body("password").isString(), controller.login);
routerUser.post('/logout', controller.logout);
routerUser.post('/refresh', controller.refresh);
routerUser.get('/users', controller.users);
routerUser.get('/test', (req, res) => {
  console.log(typeof(req));
  res.send("Ok")
})
 
