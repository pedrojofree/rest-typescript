import { Sequelize } from "sequelize";

const db = new Sequelize('fernando-typescript', 'root', '', {
    host: process.env.HOST,
    dialect: 'mysql'
});

export default db;