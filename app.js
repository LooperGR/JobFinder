const express = require('express');
const { engine } = require('express-handlebars');
const db = require('./db/connection');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//API
const PORT = 3000; //Porta de acesso

app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`);
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));

//Handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//DB Connection
db
    .authenticate()
    .then(() => {
        console.log("Connected successfully");
    })
    .catch(err => {
        console.log("Error to connect", err);
    });

//Rota
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%';

    if(!search) {

        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err));

    } else {

        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            });
        })
        .catch(err => console.log(err));
    }
});

//Rota Jobs
app.use('/jobs', require('./routes/jobs'));