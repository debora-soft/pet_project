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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenService = new token_service_1.TokenService();
class UserService {
    async registration(id, password, res) {
        const tokens = tokenService.generateToken({ id });
        let repos = (0, typeorm_1.getRepository)(user_1.User);
        let candidat = await repos.findOne({ id });
        if (candidat) {
            res.status(400).json("User already exists");
        }
        const hashPassword = await bcrypt_1.default.hash(password, 3);
        const newUser = await repos.save({
            id,
            password: hashPassword,
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
        return newUser;
    }
    async login(id, password, res) {
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
                res.cookie("refreshToken", token.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.json(token.accessToken);
                res.end();
            }
        }
    }
    async logout(refreshToken) {
        let repos = (0, typeorm_1.getRepository)(user_1.User);
        const updateResponse = await repos.update({ refreshToken: refreshToken }, { refreshToken: " " });
        return updateResponse;
    }
    async refresh(refreshToken, res) {
        if (!refreshToken) {
            res.status(401).send("Unautorized");
        }
        const userData = tokenService.validtionRefreshToken(refreshToken);
        const tokenInDB = await tokenService.findeToken(refreshToken);
        if (!userData || !tokenInDB) {
            res.status(401).send("Unautorized");
        }
        const user = await (0, typeorm_1.getRepository)(user_1.User).findOne({
            refreshToken: tokenInDB === null || tokenInDB === void 0 ? void 0 : tokenInDB.refreshToken,
        });
        const id = user === null || user === void 0 ? void 0 : user.id;
        const token = tokenService.generateToken({ id });
        res.cookie("refreshToken", token.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.json(token.accessToken);
        res.end();
    }
    async info(req, res) {
        const { refreshToken } = req.cookies;
        const decodeJWT = jsonwebtoken_1.default.decode(refreshToken);
        const id = JSON.parse(JSON.stringify(decodeJWT));
        res.json(id.id);
    }
}
exports.UserService = UserService;
