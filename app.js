//Imports

var cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var expressValidator = require('express-validator');


//Rotas

var productRoute = require('./Routes/product');
var userRoute = require('./routes/user')


//Configurações do App
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(expressValidator());

app.use(require('res-error'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());

app.use('/product', productRoute);
app.use('/user', userRoute);


//Setando a App
app.listen(8080, function () {
    console.log('HTPP// 8080')
})

