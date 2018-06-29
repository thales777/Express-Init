var express = require('express')

const router = express.Router();

const controller = require('../Controller/Product');

router.get('/', controller.getAllProducts);

router.get('/:key', controller.getByKey);   

router.post('/', controller.postProduct);

router.put('/:key', controller.editById)

router.delete('/:key', controller.deleteById)

module.exports = router;