module.exports = function(sequelize, dataTypes) {

    let alias = 'Rol';

    let cols = {
        rol_id: {
            type          : dataTypes.INTEGER,
            primaryKey    : true,
            autoIncrement : true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName  : 'roles',
        timestamps : false
    }

    let Rol = sequelize.define(alias, cols, config);

      Rol.associate = function(models) {
        Rol.hasMany(models.User, {
            as        : 'users',
            foreignKey : 'rol_id'
        })
    } 

    return Rol;

}