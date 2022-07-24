module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        //asociacion Users a roles
        User.belongsTo(models.Rol,{
            as: 'roles',
            foreignKey: 'rol_id'
        })
    }

    return User
}