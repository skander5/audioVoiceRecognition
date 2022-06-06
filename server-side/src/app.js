const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const router = require('./routes/routes')
//------ DB Config ------//

//------ Middlewares ------//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//------ Routes ------//

const options = {
    url: 'https://viewboost.cdn.prismic.io/api/v2/',

};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        console.log(info?.refs[0]?.ref + " Stars");
    }
}

//const resp = request(options, callback);

app.post('/hello',(req,res) => {
    const name = req.body.name;
    request(options, callback);
    res.send({
        "message" : `message ${name}`
    })

})
app.use('/api',router);

module.exports = app ;