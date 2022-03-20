"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const user_1 = require("../models/user");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    generateToken(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, "access_key", { expiresIn: "10m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, "refresh_key", { expiresIn: "30d" });
        return {
            accessToken,
            refreshToken,
        };
    }
    validtionAccessToken(AccessToken) {
        try {
            const verifyData = jsonwebtoken_1.default.verify(AccessToken, "access_key");
            return verifyData;
        }
        catch (e) {
            return null;
        }
    }
    validtionRefreshToken(RefreshToken) {
        try {
            const verifyData = jsonwebtoken_1.default.verify(RefreshToken, "refresh_key");
            return verifyData;
        }
        catch (e) {
            return null;
        }
    }
    async findeToken(refreshToken) {
        const repo = (0, typeorm_1.getRepository)(user_1.User);
        const tokenData = await repo.findOne('refreshToken');
        return tokenData;
    }
}
exports.TokenService = TokenService;
