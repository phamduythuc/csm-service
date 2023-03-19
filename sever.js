const app = require('./app');
const dotenv = require('dotenv')

dotenv.config({path: '.environments/config.env'});
// app.listen(process.env.PORT, () => {
//     console.log('connect app')})