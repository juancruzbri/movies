let express= require('express');
let genresController= require('../controllers/genresController');

let router= express.Router();

router.get('/', genresController.index);




module.exports= router