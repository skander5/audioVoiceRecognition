const prismicController = {};
const request = require('request');
const methodUtil = require('./../utils/methodUtils');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000 ;
const PRISMIC_URL = process.env.PRISMIC_URL;

let ref = null ;

const options =  {
    url: ''
};

async function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        console.log(info?.refs[0]?.ref + " Stars");
        ref = info?.refs[0]?.ref ;
    }
}

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}


prismicController.findRef = async (req,res,next) => {
    //await request({...options,url : PRISMIC_URL}, callback);
    let resp = await methodUtil.doRequest(PRISMIC_URL);
    const info = JSON.parse(resp);
    let prismicData = await methodUtil.doRequest(PRISMIC_URL+'/documents/search?ref='+info?.refs[0]?.ref);

    res.setHeader('Content-Type', 'application/json');
    res.end(prismicData);
    /*res.send({
        prismicData : JSON.stringify(JSON.parse(prismicData))
    });*/
    //setTimeout(()=> {console.log('aaaaaaaaa',ref)},2000,);
};

module.exports = prismicController ;