module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // You can add more fields as needed, such as brand, color, etc.
    }, {
        tableName: "products",
        timestamps: false,
        // Define hooks or methods if needed
    });

    // Define any custom methods or hooks here

    return Product;
};


