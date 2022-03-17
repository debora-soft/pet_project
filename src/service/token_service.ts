import {User} from '../models/user';
import {getRepository, createConnection} from 'typeorm'
import jwt from 'jsonwebtoken'
export class TokenService {
  
  generateToken(payload: string | object) {
    const accessToken = jwt.sign(payload, "access_key", { expiresIn: "10m" });
    const refreshToken = jwt.sign(payload, "refresh_key", { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId: string, refreshToken: any, accessToken: any) {   
    
      
         
      
               
  }
}

