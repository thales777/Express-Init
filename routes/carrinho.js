var express = require('express')

const router = express.Router();

const controller = require('../Controller/Carrinho');

router.post('/:uid/:key', controller.postProduct);

router.get('/:uid', controller.getProductsByUser);

module.exports = router;