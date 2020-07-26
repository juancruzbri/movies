let db = require ('../database/models');
const { sequelize, Sequelize } = require('../database/models');
const { removeData } = require('jquery');

let actoresController= {
    index: function(req,res){
        db.Actor.findAll({
            limit:10
        })
        .then((actors)=>res.render('actores', {actors}));
        
    }

}
module.exports=actoresController