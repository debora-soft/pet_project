"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("../service/user_service");
const express_validator_1 = require("express-validator");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const userService = new user_service_1.UserService();
class userControllers {
    async registration(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).send(JSON.stringify(errors));
                res.end();
            }
            const { id, password } = req.body;
            const userData = await userService.registration(id, password, res);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
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
            await userService.login(id, password, res);
        }
        catch (e) { }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const toResponse = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.json(toResponse);
        }
        catch (e) { }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken, res);
        }
        catch (e) { }
    }
    async users(req, res, next) {
        try {
            const users = await (0, typeorm_1.getRepository)(user_1.User).find();
            res.json(users);
        }
        catch (e) { }
    }
    async upload(req, res, next) {
        try {
            const dataFromFile = req.file;
            res.end();
        }
        catch (e) { }
    }
    ;
}
exports.userControllers = userControllers;
//module.exports = new userControllers();
