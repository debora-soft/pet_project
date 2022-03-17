import { Express } from "express";
import { UserService } from "../service/user_service";

const userService = new UserService()
export class userControllers {
  async registration(req: any, res: any, next: any) {
    try {
        //console.log("registration ..", req.body)
        const {id, password} = req.body;
        const userData = await userService.registration(id, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.end("OK");
    } catch (e) {}
  }
  async login(req: any, res: any, next: any) {
    try {
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