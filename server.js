const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv')
dotenv.config({path: './environments/config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server =  app.listen(port, () => {
    console.log(`app running on port ${port}`);})
