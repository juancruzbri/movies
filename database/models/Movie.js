module.exports = (sequelize, DataTypes) => {
    let cols= {
        id:{primaryKey: true,
            type: DataTypes.INTEGER},
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATE,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
      

    }
    let config= {
        tableName:"movies",
        timestamps: false
    }
    let Movie = sequelize.define('Movie', cols,config);

    Movie.associate=function(models){
        Movie.belongsTo(models.Genero,{
            as: "generos",
            foreignKey: "genre_id",
        });

    Movie.belongsToMany(models.Actor,{
         as: "actores",
         through: "actor_movie",
         foreignKey: "movie_id",
         otherKey: "actor_id",
         timestamps: false
      });
    }
    
    return Movie;
  };