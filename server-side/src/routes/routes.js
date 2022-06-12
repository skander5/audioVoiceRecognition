const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controllers');
const prismicController = require('../controllers/prismic.controllers');
const globalConfigController = require('../controllers/globalConfig.controllers');


// Sign up
router.post('/register',userController.register);
router.post('/findPrismicData',prismicController.findRef);
router.post('/findGlobalConf',globalConfigController.findGlobalConf);


module.exports = router;