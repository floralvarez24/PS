import { Sequelize } from "sequelize";

const db = new Sequelize ('ps_lpp', 'root', '123456', {
    host: "localhost",
    dialect:"mysql"
});

export default db;