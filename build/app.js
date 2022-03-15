"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const typeorm_1 = require("typeorm");
const file_1 = require("./models/file");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
(0, typeorm_1.createConnection)({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "password",
    database: "zimad_test",
    entities: [file_1.File],
    synchronize: true,
})
    .then((connection) => {
    console.log("Connection to the database with TypeORM has occurred");
})
    .catch((error) => console.log(error));
const PORT = process.env.PORT || 8000;
const start = async () => {
    try {
        app.listen(3500, () => console.log(`Server start on PORT ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
