"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = require("../service/token_service");
const typeorm_1 = require("typeorm");
const tokenService = new token_service_1.TokenService();
//const repos = getRepository(User);
class UserService {
    async registration(id, password) {
        const tokens = tokenService.generateToken({ id });
        (0, typeorm_1.createConnection)()
            .then(async (connection) => {
            let repos = connection.getRepository(user_1.User);
            console.log("Connection to the database with TypeORM has occurred");
            let candidat = await repos.findOne({ id });
            if (candidat) {
                throw new Error("Пользователь  с такими данными уже существует");
            }
            const hashPassword = await bcrypt_1.default.hash(password, 3);
            const newUser = await repos.save({ id, password: hashPassword, token: tokens.accessToken, refreshToken: tokens.refreshToken });
        })
            .catch((error) => console.log(error));
        return tokens;
    }
}
exports.UserService = UserService;
