//requerimos base de datos//
let db = require ('../database/models');
const { sequelize, Sequelize } = require('../database/models');
const { removeData } = require('jquery');

moviesController= {
    index:function(req,res){
        //Buscar las películas//
        db.Movie.findAll({
            
            order: [['title', 'ASC']],
            include: [{association:'generos'}]

        })
        .then((movies)=>{console.log(movies.generos); 
            res.render('moviesHome',{movies})});
    },
    detail: function(req,res){
        //buscamos las peliculas por el Pk//
        db.Movie.findByPk(req.params.id)
        .then((movie)=> {res.render('detail', {movie})});
    },
    delete: function(req,res){

        db.Movie.destroy({
            where:{id:req.params.id}
        })
        .then(()=>{res.redirect('/movies')})
        
    },
    update: function(req,res){
        db.Movie.findByPk(req.params.id)
        .then(function(movie){
            res.render('update',{movie});
        })
    },
    storeUpdate: function(req,res){
        db.Movie.update({
            title:req.body.title,
            rating:req.body.rating,
            awards:req.body.awards,
            length: req.body.length,
        },{
            where:{id:req.params.id}
        })
        .then(()=>res.redirect('/movies'))
    },
    new: function(req,res){
        db.Movie.findAll({
            order:[['release_date','DESC']],
            limit:5
        })
        .then((movies)=>{res.render('estrenos',{movies})})
    },
    recommended: function(req,res){
        db.sequelize.query("SELECT * FROM movies WHERE rating >= 8")
        .then(function(peliculas){
            let movies=peliculas[0];
            res.render('recomendadas', {movies})
        })
    },
    create: function(req,res){
        res.render('create');
    },
    storeCreate: function(req,res){
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
        })
        .then(()=>res.redirect('/movies'))
    },
    search:function(req,res){
        db.sequelize.query("SELECT * FROM movies WHERE title LIKE '%" + req.query.search +"%' ")
        .then((peliculas)=>{
            let movies=peliculas[0];
            res.render('moviesHome', {movies})
        })
    }

}

module.exports= moviesController;