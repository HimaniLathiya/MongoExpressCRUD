const Movies = require('../models/Movies');
const Movie = require('../models/Movie');
const MovieCategory = require('../models/MovieCategory');
const Joi = require('joi');

function validateMovieName(movie){
    return Joi.validate( movie , Movie.joiSchemaMovies)
}

exports.get_movies = function(req , res){
    Movies.find({category:req.params.category} , (err , item ) => {
        if(item && item.length > 0 && item !== null){   
            res.send(item)
            
        }else{
            res.send("Category Not  exits...")
            return ;
        }
    }); 
}

exports.movie_add = function (req, res) {
    
    const result = validateMovieName(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    
    MovieCategory.Model.findOne({category:req.params.category} , (err , item ) => {
        if(item !== null){   
            Movies.findOne({category : req.params.category },(err , item1) => {
                if(item1 !== null){
                    let contain =   item1.movies.some(elem => elem.movieName === req.body.movieName);
                    if(!contain){
                        item1.movies.push(req.body);
                        item1.save().then(item => {
                            res.send(item);
                        }).catch(err => {
                            console.log("err database", err)
                                res.status(400).send("unable to save to database");
                        }) 
                    }else{
                        res.send("Movie already exits..");
                    }                                   
                }else{ 
                    let movieData =  new Movie();                       
                     movieData.movies = [(req.body)];
                     movieData.category = (req.params.category) ;
                     movieData.save().then(item => {
                             res.send(item);
                         }).catch(err => {
                                 res.status(400).send("unable to save to database");
                     })
                }
            })
            
        }else{
            res.send("Category Not  exits...")
            return ;
        }
    });  
};

