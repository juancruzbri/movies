module.exports = (sequelize, DataTypes) => {
    let cols= {
        id:{primaryKey: true,
            type: DataTypes.INTEGER},
        created_at:DataTypes.DATE,
        updated_at:DataTypes.DATE,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        favorite_movie_id:DataTypes.INTEGER   

    }
    let config= {
        tableName:"actors",
        timestamps: false
    }

    let Actor = sequelize.define('Actor', cols,config);

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movie, {
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
   }


    
    return Actor;
  };