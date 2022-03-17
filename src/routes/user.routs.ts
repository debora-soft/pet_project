import  express from "express";
import { userControllers } from "../controllers/userControlers";

export const routerUser = express.Router();

const controller = new userControllers()

routerUser.post('/registration', controller.registration);
routerUser.post('/login', controller.login);
routerUser.post('/logout', controller.logout);
routerUser.post('/refresh', controller.refresh);
routerUser.get('/users', controller.users);
routerUser.get('/test', (req, res) => {
  console.log("OK");
  res.send("Ok")
})
 //module.exports = routerUuser; 
