import { User } from "../models/user";
import bcrypt from "bcrypt";
import { TokenService } from "../service/token_service";
import { getRepository, createConnection, UpdateResult } from "typeorm";
import { Request, Response } from "express";
const tokenService = new TokenService();

export class UserService {
  async registration(id: string, password: string, res: Response):Promise<User> {
    const tokens = tokenService.generateToken({ id });   
        let repos = getRepository(User);
        
        let candidat = await repos.findOne({ id });
        if (candidat) {
          res.status(400).send("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const newUser = await repos.save({
          id,
          password: hashPassword,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
     
    return newUser;
  }
  async login(id: string, password: string, res: Response) {
    let repos = getRepository(User);
    let user = await repos.findOne({ id });
    if (!user) {
      res.status(404).send("User not found");
      res.end();
    } else {
      const isPassEq = await bcrypt.compare(password, user.password);
      if (!isPassEq) {
        res.status(401).send("Unautorized");
      } else {
        const token = tokenService.generateToken({ id });
        res.cookie("refreshToken", token.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(user);
        res.end();
      }
    }
  }
  async logout(refreshToken: string):Promise<UpdateResult> {
    let repos = getRepository(User);
    
    
    const updateResponse = await repos.update({refreshToken: refreshToken}, {refreshToken: ' '})

    return updateResponse

  }
}
