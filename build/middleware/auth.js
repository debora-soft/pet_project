"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenVerification = void 0;
const token_service_1 = require("../service/token_service");
const tokenService = new token_service_1.TokenService();
function accessTokenVerification(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
        }
        const accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!accessToken) {
            res.status(401).send("Unauthorized");
        }
        else {
            const userData = tokenService.validtionAccessToken(accessToken);
            if (!userData) {
                res.status(401).send("Unauthorized");
            }
            else {
                req.user = userData;
                next();
            }
        }
    }
    catch (e) {
    }
}
exports.accessTokenVerification = accessTokenVerification;
