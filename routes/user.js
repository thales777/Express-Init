var express = require('express')

const router = express.Router();

const controller = require('../Controller/User');

router.post('/', controller.postUser);

module.exports = router;