var carrinho = require('../server').carrinho;
var product = require('../server').product;
var user = require('../server').user;
var Lista = []

exports.postProduct = (req,res,next) => {
    
    let userFind = req.params.uid;
    let keyFind = req.params.key;
    
    
    product.orderByChild("key").equalTo(keyFind).once("value", valueProduct => {
        
        valueProduct = valueProduct.toJSON();
        Lista.push(valueProduct);
        carrinho.child(userFind).update(
            {
                Lista : Lista
            }
        )
        
    }
);        
res.send("ok")
}

exports.getProductsByUser = (req,res,next) =>  { 
    
    let keyUser = req.params.uid;
    let lista = []
    
    carrinho.orderByChild(keyUser).once("value", value => {
        
        value.forEach(element => {
            element.forEach(element1 => {
                element1.forEach(element2 => {
                    lista.push(element2)
                });

            });    
        });
        res.send(lista)
    })
}
