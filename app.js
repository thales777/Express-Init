//Imports

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//Rotas

var indexRouter = require('./Routes/index');

//Configurações do App
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/', indexRouter);

//Setando a App
app.listen(8080, function () {
    console.log('HTPP// 8080')
})

