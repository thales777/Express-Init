var auth = require('../server').auth
var user = require('../server').user

exports.postUser = (req,res,next) => {

    const email = req.body.email;
    const password = req.body.password;

    auth.createUserWithEmailAndPassword(email, password).catch(e => console.log(e.message));
    
    
    res.send(req.body)

}

exports.getAllUser = (req,res,next) => {

    
    


}

