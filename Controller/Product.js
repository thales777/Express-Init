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
    res.json(value)
    });
}

exports.postProduct = (req, res, next) => {

    req.checkBody('name', 'Name não pode ser vazio').notEmpty();
    req.checkBody('price', 'Price não pode ser vazio').notEmpty();
    req.checkBody('qtdProducts', 'Insira a quantidade de Produtos').notEmpty();
    req.checkBody('description', 'Descriçao Invalida').len(0,25);

    const err = req.validationErrors();
    if(err){
        console.log(`err: ${JSON.stringify(err)}`);
        res.render('index.html')
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
        res.json(body);
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

    } else {
        res.send("ERROR" + relacao)
    }

}

exports.deleteById = (req, res, next) => {

    let key = req.params.key;
    product.child(key).remove();

}


