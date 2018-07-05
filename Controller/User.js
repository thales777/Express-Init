var auth = require('../server').auth
var user = require('../server').user

exports.postUser = (req,res,next) => {

    req.checkBody('name').notEmpty().withMessage('Name não pode ser vazio');
    req.checkBody('email').notEmpty().withMessage('Email não pode ser vazio');
    req.checkBody('email').isEmail().withMessage('Insira um Email Valido');
    req.checkBody('phone').notEmpty().withMessage('Telefone não pode ser vazio');
    req.checkBody('phone').isInt().withMessage('Apenas numeros no phone');

    const err = req.validationErrors();

    if(err){
        var errors = [];
        err.forEach(element => {
            errors.push(element.msg);
        });
        res.status(401).json(errors)
    
    } else { 
        
        const name = req.body.name;
        const email = req.body.email;
        const photo = req.body.photo;
        const phone  = req.body.phone;
        const password = req.body.password;

        auth.createUserWithEmailAndPassword(email,password)
        
        var keyTemp = user.push().key;     

        user.child(keyTemp).push(
            {
                key: keyTemp,
                name: name,
                email: email,
                photo: photo,
                phone: phone,
                password: password
            }
        );
        res.send(req.body)
    }


}

exports.getAllUser = (req,res,next) => {

    var list = [];
    user.orderByKey().once("value", value => {
        
        value.forEach(element => {
            list.push(element)            
        });
        res.json(list);
    })
}

exports.getByKey = (req,res,next) => {

    let key = req.params.key;

    user.orderByChild("key").equalTo(key).once("value", value => {

        value.forEach(element => {
            res.json(element)
        })
    });
}

exports.editByKey = (req,res,next) => {

    let key = req.params.key;
    var body = req.body;
    if (body) {

        var keyTemp = user.push().key;
        user.child(key).set(
            {
                key: keyTemp,
                name: body.name,
                email: body.email,
                photo: body.photo,
                phone: body.phone,
                password: body.password
            }
        );

        res.json(body);
    }
}

exports.deleteByKey = (req,res,next) => {

    let key = req.params.key;
    user.child(key).remove();
    res.send('ok')

}
