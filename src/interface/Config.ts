import type { DBConfig } from "./DbConfig";

export interface Config {
    development: DBConfig;
    test: DBConfig;
    production: DBConfig;
}