import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import AdminJS from "adminjs";
import connectSession from "connect-session-sequelize";
import session from "express-session";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";
import { sequelize } from "../database";
import { authenticationOptions } from "./authentication";
import { brandingOptions } from "./branding";
import { dashboardOptions } from "./dashboard";
import { locale } from "./locale";
import { adminJsResources } from "./resources";

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({ db: sequelize })
store.sync()

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions,
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD
  }
);
