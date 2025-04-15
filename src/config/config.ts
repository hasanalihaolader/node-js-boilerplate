import { Config } from "@/interface/Config";
import { DBConfig } from "@/interface/DbConfig";
import dotenv from "dotenv";
import type { Dialect } from "sequelize";

dotenv.config();

const dbDialect = (process.env.DB_CONNECTION as Dialect) || "mysql";

const config: Config = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: Number.parseInt(process.env.DB_PORT || "3306", 10),
		dialect: dbDialect,
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: Number.parseInt(process.env.DB_PORT || "3306", 10),
		dialect: dbDialect,
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: Number.parseInt(process.env.DB_PORT || "3306", 10),
		dialect: dbDialect,
	},
};

export default config;
