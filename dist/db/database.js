"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const sequelizeDb = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: config_1.dbConfig.host,
    port: Number(config_1.dbConfig.port),
    username: config_1.dbConfig.username,
    password: config_1.dbConfig.password,
    database: config_1.dbConfig.database
});
exports.default = sequelizeDb;
//# sourceMappingURL=database.js.map