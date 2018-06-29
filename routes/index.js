var express = require('express');
var router = express.Router();

router.use('/',function(req,res,next){

    title = "Ok"
    res.render('index.jade')

})


module.exports = router;
