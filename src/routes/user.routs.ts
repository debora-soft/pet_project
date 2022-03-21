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

routerUser.post('/file/upload', accessTokenVerification, upl.single('filedata'), controller.upload);
routerUser.get('/file/list', accessTokenVerification, controller.allFile);
routerUser.delete('/file/delete/:id', accessTokenVerification, controller.deleteFile);
routerUser.put('/file/update/:id', accessTokenVerification, upl.single('filedata'), controller.updateFile);
routerUser.get("/file/:id", accessTokenVerification, controller.fileInfo);
routerUser.get('/file/download/:id', accessTokenVerification, controller.getFile);
routerUser.get("/info", accessTokenVerification, controller.info);


 
