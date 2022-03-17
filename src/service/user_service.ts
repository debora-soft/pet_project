import {User} from '../models/user';
import bcrypt from 'bcrypt'
import {TokenService} from '../service/token_service'
import { getRepository, createConnection } from 'typeorm';
const tokenService = new TokenService()
//const repos = getRepository(User);

export class UserService {
  async registration(id:string, password:string){
    const tokens = tokenService.generateToken({ id }); 
    createConnection()
      .then(async(connection) => {
        let repos = connection.getRepository(User)
        console.log("Connection to the database with TypeORM has occurred");
        let candidat = await repos.findOne({ id });
        if (candidat) {
          throw new Error("Пользователь  с такими данными уже существует");
        }
        const hashPassword = await bcrypt.hash(password, 3);        
        const newUser = await repos.save({ id, password: hashPassword, token: tokens.accessToken, refreshToken: tokens.refreshToken });               
      })
      .catch((error) => console.log(error));     
    return tokens;
  }
  async login(id: string, password: string){

  }
}

