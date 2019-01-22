const Joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);

const categorySchema = Joi.object().keys({
    category: Joi.string().required(),
  })
const categorySchemaMain  = new mongoose.Schema(joigoose.convert(categorySchema)) 
const Model = mongoose.model('Category', categorySchemaMain)  ;

module.exports = { Model , categorySchema}