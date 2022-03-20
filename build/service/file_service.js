"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const file_1 = require("../models/file");
const typeorm_1 = require("typeorm");
class FileService {
    async upload(req, res) {
        var _a, _b, _c, _d, _e, _f;
        (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const fileData = await (0, typeorm_1.getRepository)(file_1.File).save({
            name: (_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname,
            file_extension: (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype.split("/")[1],
            MIME_type: (_d = req.file) === null || _d === void 0 ? void 0 : _d.mimetype,
            size: (_e = req.file) === null || _e === void 0 ? void 0 : _e.size,
            path: (_f = req.file) === null || _f === void 0 ? void 0 : _f.path,
        });
        return fileData;
    }
    async listFile() {
        const listFile = await (0, typeorm_1.getRepository)(file_1.File).find({ order: { createDate: "ASC" } });
        return listFile;
    }
}
exports.FileService = FileService;
