import  express from "express";
import { userControllers } from "../controllers/userControlers";
import { body } from "express-validator";
import { accessTokenVerification } from "../middleware/auth";
import { upl } from "../middleware/upload";


export const routerUser = express.Router();

const controller = new userControllers()

routerUser.post('/registration', body("id").isString(), body("password").isString(), controller.registration);
routerUser.post('/login', body("id").isString(), body("password").isString(), controller.login);
routerUser.post('/logout', controller.logout);
routerUser.post('/refresh', controller.refresh);
routerUser.get('/users', accessTokenVerification, controller.users);

routerUser.post('/file/upload', upl.single('filedata'), controller.upload);
routerUser.get('/file/list', controller.allFile);


 
