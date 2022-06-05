const methodUtil = {};

const request = require('request');


methodUtil.doRequest = (url) => {
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



module.exports = methodUtil ;