const Joi = require('joi');


const joiSchemaMovies = Joi.object().keys({
    movieName: Joi.string().required()
  })

//const movieSchemaMain = new mongoose.Schema(joigoose.convert(joiSchemaMovies)) 

module.exports ={joiSchemaMovies}