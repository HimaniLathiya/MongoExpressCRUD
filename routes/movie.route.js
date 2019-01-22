const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/category.controller');
const movie_controller = require('../controllers/movie.controller');

router.post('/api/category', category_controller.category_create);
router.get('/api/category', category_controller.category_getAll);


router.post('/api/category/:category', movie_controller.movie_add);
router.get('/api/category/:category', movie_controller.get_movies);


module.exports = router;