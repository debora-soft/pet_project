"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mysql2_1 = __importDefault(require("mysql2"));
require("reflect-metadata");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
const connection = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'zimad_test'
});
connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connection to the database has occurred');
    }
});
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
