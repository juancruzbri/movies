module.exports = (sequelize, DataTypes) => {
    let cols= {
        id:{primaryKey: true,
            type: DataTypes.INTEGER},
        created_at:DataTypes.DATE,
        updated_at:DataTypes.DATE,
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,    

    }
    let config= {
        tableName:"genres",
        timestamps: false
    }

    //definimos genero//
    const Genero = sequelize.define('Genero', cols,config);

    Genero.associate= function(models){
        Genero.hasMany(models.Movie,{
            as: 'movies',
            foreignKey:'genre_id',
        })
    } 
    
    return Genero;
  };