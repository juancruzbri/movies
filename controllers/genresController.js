let db = require ('../database/models');
const { sequelize, Sequelize } = require('../database/models');
const { removeData } = require('jquery');

let genresController= {
    index: function(req,res){
        db.Genero.findAll({
            limit:10
        })
        .then((generos)=>res.render('generos', {generos}));
        
    }

}
module.exports=genresController