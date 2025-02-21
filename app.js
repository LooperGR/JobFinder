const express = require('express');
const exphbs = require('express-handlebars');
const db = require('./db/connection');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//API
const PORT = 3000; //Porta de acesso

app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`);
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));

//Handle bars
app.set('views', path.join(__dirname, 'viewes'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Static folder
app.use(express.static(path, join(__dirname, 'public')));

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
    res.send('Teste');
});

//Rota Jobs
app.use('/jobs', require('./routes/jobs'));