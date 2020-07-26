let express= require('express');
let actoresController= require('../controllers/actoresController');

let router= express.Router();

router.get('/', actoresController.index);




module.exports= router