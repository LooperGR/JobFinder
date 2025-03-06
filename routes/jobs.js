const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/test', (req, res) => {
    res.send('Deu certo');
});

router.get('/add', (req, res) => {
    res.render('add');
})

//Adiciona o job via post
router.post('/add', (req, res) => {

    //dados que precisa pra add no banco
    let {title, salary, company, description, email, new_job } = req.body; 

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

//Exportando as rotas
module.exports = router;
