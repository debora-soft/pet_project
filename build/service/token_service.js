"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
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
    async saveToken(userId, refreshToken, accessToken) {
    }
}
exports.TokenService = TokenService;
