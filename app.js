const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);

const router = require('./routes/movie.route'); 

let dev_db_url = 'mongodb://Himani:himani123@ds161224.mlab.com:61224/vidly';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', router);


app.get('/',(req,res) => {
    res.send("hello Himani");
})



app.listen(3000, () => {
    console.log('Server is up and running on port numner 3000...' );
});