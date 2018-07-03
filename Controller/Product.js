var product = require('../server').product;

exports.getAllProducts = (req, res, next) => {
    
    var list = [];
    product.orderByKey().once("value", value => {
        
        value.forEach(element => {
            list.push(element)            
        });
        res.json(list);
    })
}

exports.getByKey = (req, res, next) => {

    let key = req.params.key;

    product.orderByChild("key").equalTo(key).once("value", value => {

        value.forEach(element => {
            res.json(element)
        })
    });
}

exports.postProduct = (req, res, next) => {

    req.checkBody('name').notEmpty().withMessage('Name não pode ser vazio');
    req.checkBody('price').isDecimal().withMessage('O preço tem que ser Numero');
    req.checkBody('price').notEmpty().withMessage('Price não pode ser vazio');
    req.checkBody('qtdProducts').notEmpty().withMessage('Insira a quantidade de Produtos');
    req.checkBody('qtdProducts').isDecimal().withMessage('Quantidade de Produtos tem que ser Numero');


    const err = req.validationErrors();
    if(err){
        err.forEach(element => {
            res.status(401).write(element.msg + "\n ")
        });
        res.end();
        
    } else {

        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const qtdProducts = req.body.qtdProducts;

        var keyTemp = product.push().key;     

        product.push(
            {
                key: keyTemp,
                name: name,
                price: price,
                description: description,
                qtdProducts: qtdProducts
            }
        );
        res.json(req.body);
}}

exports.editById = (req, res, next) => {

    let key = req.params.key;
    var body = req.body;
    if (body) {

        var keyTemp = product.push().key;
        product.child(key).set(
            {
                key: keyTemp,
                name: body.name,
                price: body.price,
                description: body.description,
                qtdProducts: body.qtdProducts
            }
        );

        res.json(body);

    } 
}

exports.deleteById = (req, res, next) => {

    let key = req.params.key;
    product.child(key).remove();

}


