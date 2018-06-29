var configFirebase = require('./config');
var firebase = require('firebase');


//Iniciando o Banco de Dados
var appFirebase = firebase.initializeApp(config);
var database = appFirebase.database();

//Criando Tabelas
exports.product = database.ref('product');
exports.user = database.ref('user');
exports.auth = firebase.auth();
