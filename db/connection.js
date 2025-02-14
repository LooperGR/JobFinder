const Sequelize = require('sequelize');

//Instância de conexão com o banco
const sequelize = new Sequelize({
    dialect: 'sqlite', 
    storage: './db/app.db'
});

//Para ser exportado
module.exports = sequelize
