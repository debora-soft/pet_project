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
  async login(id: string, password: string, res: any){

    const tokens = tokenService.generateToken({ id });    
    let repos = getRepository(User)     
    let user = await repos.findOne({ id });
    if (!user) {
          res.status(404).send("User not found");
          res.end();
        }  else {
        const isPassEq = await bcrypt.compare(password, user.password);
          if (!isPassEq) {
            res.status(401).send("Unautorized")                   
            } else {
              const token =  tokenService.generateToken({ id });
              res.cookie(
                "refreshToken",
                token.refreshToken,
                "accessToken",
                token.accessToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
              );
              res.json(user);
              res.end();
            }
          
        }
        
    
     
    

  }
}

