const Sequelize = require('sequelize');
const db = require('../db/connection');

//model
const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    }
});

//O createdAt e updatedAt precisam estar criados no banco, pois o sequelize os envia automaticamente

//Para ser exportado
module.exports = Job