"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("../service/user_service");
const express_validator_1 = require("express-validator");
const userService = new user_service_1.UserService();
class userControllers {
    async registration(req, res, next) {
        try {
            console.log(req);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).send(errors.array);
                res.end();
                next();
            }
            const { id, password } = req.body;
            const userData = await userService.registration(id, password);
            res.cookie('refreshToken', userData.refreshToken, 'accessToken', userData.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json(userData);
        }
        catch (e) { }
    }
    async login(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).send(JSON.stringify(errors));
            }
            const { id, password } = req.body;
            const userData = await userService.login(id, password, res);
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
