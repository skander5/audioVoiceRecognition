const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,() => {
    console.log(dotenv);
    console.log(`server is ready on  ${PORT} `);
});

//module.exports = app ;