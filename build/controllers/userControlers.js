"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("../service/user_service");
const file_service_1 = require("../service/file_service");
const express_validator_1 = require("express-validator");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const userService = new user_service_1.UserService();
const fileService = new file_service_1.FileService();
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
            const fileData = await fileService.upload(req, res);
            if (fileData) {
                res.json(fileData);
            }
            else {
                res.status(500).json("Не удалось сохранить файл");
            }
        }
        catch (e) { }
    }
    async allFile(req, res, next) {
        const allFile = await fileService.listFile();
        let list_size = Number(req.query.list_size) | 10;
        const page = Number(req.query.page) | 1;
        let offset = page * list_size;
        const fileToReturn = [];
        if (allFile.length === 0) {
            res.json("Not files");
        }
        else {
            const count = allFile.length;
            if (allFile.length < offset) {
                offset = allFile.length - (offset - allFile.length) - 1;
            }
            if (allFile.length < list_size) {
                list_size = allFile.length;
            }
            if (allFile.length === offset) {
                offset = offset;
            }
            if (allFile.length < offset + list_size) {
                list_size = Math.abs(offset - allFile.length);
            }
            for (let i = offset; i < offset + list_size; i++) {
                fileToReturn.push(allFile[i]);
            }
            res.json(fileToReturn);
        }
    }
    async deleteFile(req, res, next) {
        const id = req.params.id;
        await fileService.deleteFile(id, res);
    }
    async updateFile(req, res, next) {
        const id = req.params.id;
        await fileService.updateFile(id, req, res);
    }
}
exports.userControllers = userControllers;
