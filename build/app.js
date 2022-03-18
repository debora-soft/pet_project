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
const user_routs_1 = require("./routes/user.routs");
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api', user_routs_1.routerUser);
app.post('/', (req, res) => {
    console.log(req.body);
    res.send("123");
});
(0, typeorm_1.createConnection)();
const PORT = process.env.PORT || 7000;
const start = async () => {
    try {
        app.listen(7000, () => console.log(`Server start on PORT ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
