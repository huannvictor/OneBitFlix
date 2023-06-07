"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJsRouter = exports.adminJs = void 0;
const express_1 = __importDefault(require("@adminjs/express"));
const sequelize_1 = __importDefault(require("@adminjs/sequelize"));
const adminjs_1 = __importDefault(require("adminjs"));
const database_1 = require("../database");
const authentication_1 = require("./authentication");
const branding_1 = require("./branding");
const dashboard_1 = require("./dashboard");
const locale_1 = require("./locale");
const resources_1 = require("./resources");
adminjs_1.default.registerAdapter(sequelize_1.default);
exports.adminJs = new adminjs_1.default({
    databases: [database_1.sequelize],
    rootPath: "/admin",
    resources: resources_1.adminJsResources,
    branding: branding_1.brandingOptions,
    locale: locale_1.locale,
    dashboard: dashboard_1.dashboardOptions,
});
exports.adminJsRouter = express_1.default.buildAuthenticatedRouter(exports.adminJs, authentication_1.authenticationOptions, null, { resave: false, saveUninitialized: false });