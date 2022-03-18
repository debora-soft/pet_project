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
    async login(id, password, res) {
        const tokens = tokenService.generateToken({ id });
        let repos = (0, typeorm_1.getRepository)(user_1.User);
        let user = await repos.findOne({ id });
        if (!user) {
            res.status(404).send("User not found");
            res.end();
        }
        else {
            const isPassEq = await bcrypt_1.default.compare(password, user.password);
            if (!isPassEq) {
                res.status(401).send("Unautorized");
            }
            else {
                const token = tokenService.generateToken({ id });
                res.cookie("refreshToken", token.refreshToken, "accessToken", token.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                res.json(user);
                res.end();
            }
        }
    }
}
exports.UserService = UserService;
