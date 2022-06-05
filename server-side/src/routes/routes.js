const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controllers');
const prismicController = require('../controllers/prismic.controllers');


// Sign up
router.post('/register',userController.register);
router.post('/findPrismicData',prismicController.findRef);


module.exports = router;