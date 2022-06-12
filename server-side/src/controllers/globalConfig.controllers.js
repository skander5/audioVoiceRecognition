const globalConfigController = {};
const request = require('request');
const methodUtil = require('./../utils/methodUtils');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000 ;

globalConfigController.findGlobalConf = (req,res,next) => {
    res.send({
        product_group_code:process.env.PRODUCT_GROUP_CODE,
        product_group_label:process.env.PRODUCT_GROUP_LABEL
    });
};


module.exports = globalConfigController ;