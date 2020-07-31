//requerimos base de datos//
let db = require ('../database/models');
const { sequelize, Sequelize } = require('../database/models');
const { removeData } = require('jquery');
const { promiseImpl } = require('ejs');

moviesController= {
    index:function(req,res){
        //Buscar las películas//
        db.Movie.findAll({
            
            order: [['title', 'ASC']]

        })
        .then((movies)=>{console.log(movies); 
            res.render('moviesHome',{movies})});
    },
    detail: function(req,res){
        //buscamos las peliculas por el Pk//
        db.Movie.findByPk(req.params.id,{
            include:[{association:"generos"},{association: "actores"}]
        })
        .then((movie)=> {
            console.log(movie);
            res.render('detail', {movie})});
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
        let generos=db.Genero.findAll()
        let actores= db.Actor.findAll()
        Promise.all([generos,actores])
        .then(([generos,actores])=>{
            console.log(actores);
            res.render('create', {generos, actores}
            )});
    },
    storeCreate: function(req,res){
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            genre_id: req.body.genero
        })//ACA ME EXPLOTA//
        .then(()=>{
            db.Movie.set([res.body.actor,req.body.actor2],{
                where: {title: req.body.title}
            })            
        })//ACA ME EXPLOTA//
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