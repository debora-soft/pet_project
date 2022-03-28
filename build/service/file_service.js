"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const file_1 = require("../models/file");
const typeorm_1 = require("typeorm");
const fs = __importStar(require("fs"));
class FileService {
    async upload(req, res) {
        var _a, _b, _c, _d, _e;
        const fileData = await (0, typeorm_1.getRepository)(file_1.File).save({
            name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
            file_extension: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype.split("/")[1],
            MIME_type: (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype,
            size: (_d = req.file) === null || _d === void 0 ? void 0 : _d.size,
            path: (_e = req.file) === null || _e === void 0 ? void 0 : _e.path,
        });
        return fileData;
    }
    async listFile() {
        const listFile = await (0, typeorm_1.getRepository)(file_1.File).find({
            order: { createDate: "ASC" },
        });
        return listFile;
    }
    async deleteFile(id, res) {
        const deletedFile = await (0, typeorm_1.getRepository)(file_1.File).findOne({ id });
        if (deletedFile) {
            fs.unlink(deletedFile.path, async (err) => {
                if (err) {
                    console.log(err);
                    res.json(err);
                    res.end();
                }
                else {
                    await (0, typeorm_1.getRepository)(file_1.File).delete({ id });
                    const delFile = await (0, typeorm_1.getRepository)(file_1.File).findOne({ id });
                    if (delFile) {
                        res.json("could not delete file information from the database");
                        res.end();
                    }
                    else {
                        res.status(200);
                        res.end();
                    }
                }
            });
        }
    }
    async updateFile(id, req, res) {
        const udatedFile = await (0, typeorm_1.getRepository)(file_1.File).findOne({ id });
        if (udatedFile) {
            fs.unlink(udatedFile.path, async (err) => {
                var _a, _b, _c, _d, _e;
                if (err) {
                    res.json(err);
                    res.end();
                }
                else {
                    await (0, typeorm_1.getRepository)(file_1.File).update({ id: udatedFile.id }, {
                        name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
                        file_extension: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype.split("/")[1],
                        MIME_type: (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype,
                        size: (_d = req.file) === null || _d === void 0 ? void 0 : _d.size,
                        path: (_e = req.file) === null || _e === void 0 ? void 0 : _e.path,
                    });
                    const newFile = await (0, typeorm_1.getRepository)(file_1.File).findOne({
                        id: udatedFile.id,
                    });
                    if (newFile) {
                        res.json(file_1.File);
                        res.end();
                    }
                    else {
                        res.status(400).json("the updated file could not be found");
                    }
                }
            });
        }
    }
    async fileInfo(id, req, res) {
        const fileInfo = await (0, typeorm_1.getRepository)(file_1.File).findOne({
            id,
        });
        if (fileInfo) {
            res.status(200).json(fileInfo);
            res.end();
        }
        else {
            res.status(400).json("file not found");
        }
    }
    async getFile(id, req, res) {
        const file = await (0, typeorm_1.getRepository)(file_1.File).findOne({
            id,
        });
        if (file) {
            if (fs.existsSync(file.path)) {
                res.download(file.path);
            }
            else {
                res.status(400).json("file not found");
            }
        }
        else {
            res.status(400).json("file not found");
        }
    }
}
exports.FileService = FileService;
