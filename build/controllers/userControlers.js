"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("../service/user_service");
const userService = new user_service_1.UserService();
class userControllers {
    async registration(req, res, next) {
        try {
            //console.log("registration ..", req.body)
            const { id, password } = req.body;
            const userData = await userService.registration(id, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.end("OK");
        }
        catch (e) { }
    }
    async login(req, res, next) {
        try {
        }
        catch (e) { }
    }
    async logout(req, res, next) {
        try {
        }
        catch (e) { }
    }
    async refresh(req, res, next) {
        try {
        }
        catch (e) { }
    }
    async users(req, res, next) {
        try {
            res.send("Hello");
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.userControllers = userControllers;
//module.exports = new userControllers();
