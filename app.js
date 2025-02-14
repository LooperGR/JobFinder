const express = require('express');
const db = require('./db/connection')
const app = express();
const bodyParser = require('body-parser');

//API
const PORT = 3000; //Porta de acesso

app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`);
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));

//Conexão Banco
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
    res.send('Teste');
});

//Rota Jobs
app.use('/jobs', require('./routes/jobs'));