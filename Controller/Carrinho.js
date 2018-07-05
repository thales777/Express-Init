var carrinho = require('../server').carrinho;
var product = require('../server').product;
var user = require('../server').user;
var Lista = []

exports.postProduct = (req,res,next) => {
    
    let userFind = req.params.uid;
    let keyFind = req.params.key;


    product.orderByChild("key").equalTo(keyFind).once("value", valueProduct => {
        
        valueProduct = valueProduct.toJSON();
        Lista.push(valueProduct)
        console.log(Lista)
        carrinho.child(userFind).set(
            {
                ListaTest : Lista
            }
        )
        
    }
);        
res.send("ok")
}

exports.getProductsByUser = (req,res,next) =>  { 
    
    let keyUser = req.params.uid;
    
    carrinho.orderByChild(keyUser).once("value", value => {
        
        value = value.toJSON();
        res.send(value)
    })
}

// Lista.push(valueProduct);