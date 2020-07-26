module.exports = (sequelize, DataTypes) => {
    let cols= {
        id:{primaryKey: true,
            type: DataTypes.INTEGER},
        created_at:DataTypes.DATE,
        updated_at:DataTypes.DATE,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        favorite_movie_id:DataTypes.INTEGER,    

    }
    let config= {
        tableName:"actors",
        timestamps: false
    }
    const Actor = sequelize.define('Actor', cols,config);


    
    return Actor;
  };