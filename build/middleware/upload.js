"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upl = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads");
    },
    filename(req, file, cb) {
        const data = (0, uuid_1.v4)();
        cb(null, `${data}.${file.mimetype.split('/')[1]}`);
    },
});
exports.upl = (0, multer_1.default)({
    storage
});
