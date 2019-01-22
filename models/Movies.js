const Joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);

const joiSchemaMovie = Joi.object().keys({
    category: Joi.string(),
    movies:Joi.array().items({
        movieName: Joi.string().required()
    })
})
const schemaMovie  = new mongoose.Schema(joigoose.convert(joiSchemaMovie)) 
module.exports = mongoose.model('Movies', schemaMovie);