import fs from "node:fs";
import path from "node:path";
import { Sequelize, DataTypes } from "sequelize";
import process from "node:process";
import type { Dialect } from "sequelize";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const basename = path.basename(__filename);
const env =
	(process.env.NODE_ENV as "development" | "test" | "production") ||
	"development";
const config = require("@/config/config").default[env];

const db: {
	[key: string]: any;
	sequelize?: Sequelize;
	Sequelize?: typeof Sequelize;
} = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
	sequelize = new Sequelize(
		process.env[config.use_env_variable] as string,
		config,
	);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, {
		...config,
		dialect: config.dialect as Dialect,
	});
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".ts" &&
			file.indexOf(".test.ts") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file)).default(
			sequelize,
			DataTypes,
		);
		db[model.name] = model;
	});

for (const modelName of Object.keys(db)) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
