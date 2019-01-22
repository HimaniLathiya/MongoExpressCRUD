const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose)

let dev_db_url = 'mongodb://Himani:himani123@ds161224.mlab.com:61224/vidly';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const joiSchema = Joi.object().keys({
    category: Joi.string().required(),
  })
const joiSchemaMovie = Joi.object().keys({
    category: Joi.string(),
    movies :[{
        movieName: Joi.string().required()
        }]  
})

const joiSchemaMovies = Joi.object().keys({
  movieName: Joi.string().required()
})
const categorySchema = new mongoose.Schema(joigoose.convert(joiSchema))
//const movieSchema = new mongoose.Schema(joigoose.convert(joiSchemaMovies))
const movieSchemaMain = new mongoose.Schema(joigoose.convert(joiSchemaMovie))

var Category = mongoose.model("Genres", categorySchema);
var Movie = mongoose.model("Movie", movieSchemaMain);

function validateCat(category){
    return Joi.validate( category , joiSchema)
}
function validateMovieName(movie){
    return Joi.validate( movie , joiSchemaMovies)
}

app.get('/',(req,res) => {
    res.send("hello Himani");
})

app.post('/api/category',(req,res) =>{
    console.log("request",req.body)
    const result = validateCat(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    Category.findOne({category:req.body.category} , (err , item ) => {
        if(item === null){
            var myData = new Category(req.body);
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
      
})
app.get('/api/category',(req,res) =>{
   // console.log("Category",Category.findOne());
    var response = Category.find({} , (err , items ) => {
       res.status(200).send(items);
    });
})
app.put('/api/category',(req,res) =>{
    console.log("request",req.body)
    const result = validateCat(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    Category.findOne({category:req.body.category} , (err , item ) => {
        if(item === null){
            var myData = new Category(req.body);
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
 })

app.post('/api/category/:category',(req,res) =>{
    const result = validateMovieName(req.body);
    console.log("error",req.body , result.error);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    console.log("movie cat"  , req.params.category);
    
    Category.findOne({category:req.params.category} , (err , item ) => {
        console.log("dkj",item)
        if(item !== null){   
            Movie.findOne({category : req.params.category },(err , item1) => {
                console.log("item1",item1  , req.params.category )
                if(item1 !== null){
                    // Movie.findByIdAndUpdate(item._id , {
                    //     $push 
                    // })
                    let movieData =  new Movie();     
                   // movieData.movies = [];                    
                    movieData.movies = [(req.body)];
                    movieData.category = (req.params.category) ;
                    console.log("movieData",movieData)
                    movieData.save().then(item => {
                            console.log("item ",item);
                            res.send(item);
                        }).catch(err => {
                            console.log("err database", err)
                                res.status(400).send("unable to save to database");
                    })
                    
                }else{ 
                    let movieData =  new Movie();     
                    // movieData.movies = [];                    
                     movieData.movies = [(req.body)];
                     movieData.category = (req.params.category) ;
                     console.log("movieData",movieData)
                     movieData.save().then(item => {
                             console.log("item ",item);
                             res.send(item);
                         }).catch(err => {
                             console.log("err database", err)
                                 res.status(400).send("unable to save to database");
                     })
                }
            })
            
            // let movieData =  new Movie();                         
            // movieData.movies = (req.body);
            // movieData.category = (req.params.category) ;
            // console.log("database", movieData)
            // movieData.save().then(item => {
            //     console.log("item ",item);
            //     res.send(item);
            // }).catch(err => {
            //     console.log("err database", err)
            //         res.status(400).send("unable to save to database");
            //     })
        }else{
            res.send("Category Not  exits...")
            return ;
        }
    });         
});


app.listen(3000, () => {
    console.log('Server is up and running on port numner 3000...' );
});