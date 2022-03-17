"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = __importDefault(require("express"));
const userControlers_1 = require("../controllers/userControlers");
exports.routerUser = express_1.default.Router();
const controller = new userControlers_1.userControllers();
exports.routerUser.post('/registration', controller.registration);
exports.routerUser.post('/login', controller.login);
exports.routerUser.post('/logout', controller.logout);
exports.routerUser.post('/refresh', controller.refresh);
exports.routerUser.get('/users', controller.users);
exports.routerUser.get('/test', (req, res) => {
    console.log("OK");
    res.send("Ok");
});
//module.exports = routerUuser; 
