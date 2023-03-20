const  express = require('express');
const {models} = require("mongoose");
const  morgan = require('morgan');

const  app = express();
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
module.exports = app;
