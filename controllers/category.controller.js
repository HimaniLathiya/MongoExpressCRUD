const MovieCategory = require('../models/MovieCategory');
const Joi = require('joi');

function validateCat(category){
    return Joi.validate( category , MovieCategory.categorySchema)
}

exports.category_create = function (req, res) {
    
    const result = validateCat(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    MovieCategory.Model.findOne({category:req.body.category} , (err , item ) => {
        if(item === null){
            var myData = new MovieCategory.Model(req.body);
                myData.save().then(item => {
                    res.send(item);
                }).catch(err => {
                    res.status(400).send("unable to save to database");
                })
          }else{
            res.send("Category already exits")
            return ;
          }    
    });
};

exports.category_getAll = function (req, res) {
    
    var response = MovieCategory.Model.find({} , (err , items ) => {
        res.status(200).send(items);
     });
};