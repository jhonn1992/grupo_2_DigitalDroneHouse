module.exports = (sequalize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        reference: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        features1: {
            type: dataTypes.STRING
        },
        features2: {
            type: dataTypes.STRING
        },
        features3: {
            type: dataTypes.STRING
        },
        features4: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Products = sequalize.define(alias, cols, config)

/*     Products.associate = function(models) {
        Products.belongsTo(models.Category, {
            foreignKey: "category_id",
            as: "categories"
        }) 
    } */

    return Products
};


