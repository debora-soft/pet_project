import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user_service";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import { User } from "../models/user";

const userService = new UserService();
export class userControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send(JSON.stringify(errors));
        res.end();
      }
      const { id, password } = req.body;
      const userData = await userService.registration(id, password, res);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {}
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send(JSON.stringify(errors));
      }
      const { id, password } = req.body;
      await userService.login(id, password, res);
    } catch (e) {}
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const toResponse = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(toResponse);
    } catch (e) {}
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken, res);
    } catch (e) {}
  }
  async users(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await getRepository(User).find();
      res.json(users);
    } catch (e) {}
  }
  async upload(req: Request, res: Response, next: NextFunction) {
     try {
      const dataFromFile = req.file
     res.end();
     } catch (e) {}
  };
}

//module.exports = new userControllers();
