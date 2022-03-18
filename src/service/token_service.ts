import {User} from '../models/user';
import {getRepository, createConnection} from 'typeorm'
import jwt, { JwtPayload } from 'jsonwebtoken'
export class TokenService {
  generateToken(payload: string | object) {
    const accessToken = jwt.sign(payload, "access_key", { expiresIn: "10m" });
    const refreshToken = jwt.sign(payload, "refresh_key", { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken,
    };
  }

  validtionAccessToken(AccessToken: string): string | null | JwtPayload {
    try {
      const verifyData = jwt.verify(AccessToken, "access_key");
      return verifyData;
    } catch (e) {return null}
    
  }
 validtionRefreshToken(RefreshToken: string): string | null | JwtPayload {
    try {
      const verifyData = jwt.verify(RefreshToken, "refresh_key");
      return verifyData;
    } catch (e) {return null}
    
  }

  async findeToken (refreshToken: string){
    const repo = getRepository(User);
    const tokenData = await repo.findOne('refreshToken');
    return tokenData;

  }
}