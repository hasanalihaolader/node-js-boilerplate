import type { Dialect } from "sequelize";

export interface DBConfig {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string | undefined;
    port: number;
    dialect: Dialect;
}