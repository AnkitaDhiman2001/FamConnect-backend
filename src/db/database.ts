import {Sequelize} from "sequelize";
import {dbConfig} from "../config/config";


const sequelizeDb = new Sequelize({
    dialect: 'postgres',
    host: dbConfig.host,
    port: Number(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
})

export default sequelizeDb;