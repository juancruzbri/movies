let express = require ('express');
let moviesController=require ('../controllers/moviesController');
let router = express.Router();

//RUTAS//
//INDEX//
router.get('/', moviesController.index);
//DETALLE//
router.get('/detail/:id', moviesController.detail);
//CREATE//
router.get('/create',moviesController.create);
router.post('/create',moviesController.storeCreate);
//DELETE//
router.post('/delete/:id', moviesController.delete);
//UPDATE
router.get('/update/:id', moviesController.update);
router.post('/update/:id', moviesController.storeUpdate);
//nuevas//
router.get('/new', moviesController.new);
//recomendadas//
router.get('/recommended', moviesController.recommended);

router.get('/search', moviesController.search);




module.exports=router;