import { Express } from "express";
import { UserService } from "../service/user_service";
import { validationResult } from "express-validator";

const userService = new UserService()
export class userControllers {
  async registration(req: any, res: any, next: any) {
    try {
      console.log(req)
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          res.status(400).send(errors.array)
          res.end();
          next();
        }
        const {id, password} = req.body;
        const userData = await userService.registration(id, password);
        res.cookie('refreshToken', userData.refreshToken, 'accessToken', userData.accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData);
       
    } catch (e) {}
  }
  async login(req: any, res: any, next: any) {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        res.status(400).send(JSON.stringify(errors));
        
      }
       const { id, password } = req.body;
       const userData = await userService.login(id, password, res)
       } catch (e) {}
  }
  async logout(req: any, res: any, next: any) {
    try {
    } catch (e) {}
  }
  async refresh(req: any, res: any, next: any) {
    try {
    } catch (e) {}
  }
  async users(req: any, res: any, next: any) {
    try {
      res.send("Hello");
    } catch (e) {
      console.log(e)
    }
  }
}

//module.exports = new userControllers();