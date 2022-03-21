import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user_service";
import { FileService } from "../service/file_service";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import { User } from "../models/user";
import { File } from "../models/file";

const userService = new UserService();
const fileService = new FileService();
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
      const fileData = await fileService.upload(req, res);
      if (fileData) {
        res.json(fileData);
      } else {
        res.status(500).json("Не удалось сохранить файл");
      }
    } catch (e) {}
  }
  async allFile(req: Request, res: Response, next: NextFunction) {
    const allFile: File[] = await fileService.listFile();
    let list_size: number = Number(req.query.list_size) | 10;
    const page: number = Number(req.query.page) | 1;
    let offset: number = page * list_size;
    const fileToReturn: Array<File> = [];
    if (allFile.length === 0) {
      res.json("Not files");
    } else {
      const count: number = allFile.length;
      if (allFile.length < offset) {
        offset = allFile.length - (offset - allFile.length) - 1;
      }
      if (allFile.length < list_size) {
        list_size = allFile.length;
      }
      if (allFile.length === offset) {
        offset = offset;
      }
      if (allFile.length < offset + list_size) {
        list_size = Math.abs(offset - allFile.length);
      }
      for (let i = offset; i < offset + list_size; i++) {
        fileToReturn.push(allFile[i]);
      }

      res.json(fileToReturn);
    }
  }
  async deleteFile(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    await fileService.deleteFile(id, res);
  }
  async updateFile(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    await fileService.updateFile(id, req, res);
  }
}
