import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { TokenService } from "../service/token_service";
const tokenService = new TokenService()

export function accessTokenVerification(req: any, res: Response, next: NextFunction){
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader){
      
    }
    const accessToken = authHeader?.split(' ')[1]
    
    if(!accessToken){
       res.status(401).send("Unauthorized");
    } else {
      const userData = tokenService.validtionAccessToken(accessToken);
     
      if(!userData){
         res.status(401).send("Unauthorized");
      } else {
        req.user = userData;
        next();
      }
    }
    } catch (e){
   
  }
}