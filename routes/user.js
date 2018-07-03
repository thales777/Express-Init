var express = require('express')

const router = express.Router();

const controller = require('../Controller/User');

router.post('/', controller.postUser);

router.get('/', controller.getAllUser)

router.get('/:key', controller.getByKey);

router.put('/:key', controller.editByKey);

router.delete('/:key', controller.deleteByKey);

module.exports = router;