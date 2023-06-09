"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const adminjs_1 = require("./adminjs");
const database_1 = require("./database");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(adminjs_1.adminJs.options.rootPath, adminjs_1.adminJsRouter);
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(routes_1.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    database_1.sequelize.authenticate().then(() => {
        console.log("DB connection successful");
    });
    console.log(`Server started successfully at port ${PORT}`);
});
