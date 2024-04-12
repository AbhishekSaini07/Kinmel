

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4] // Minimum length of 4 characters
            }
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: "abc@gmail.com",
            allowNull: false,
            validate: {
                isEmail: true // Ensure it's a valid email address
            }
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        photoUrl: DataTypes.STRING,
        profileText: {
            type: DataTypes.STRING,
            defaultValue: "I'm using Twitter",
        },
        hashCode: {
            type: DataTypes.STRING,
            allowNull: true, // Allow null as the hashcode might not always be present
        },
        expirationTime: {
            type: DataTypes.DATE, // Store expiration time as a date
            allowNull: true, // Allow null if there's no expiration time set
        },
    }, {
        tableName: "users",
        timestamps: false,
        // Define hooks or methods for handling expiration logic if needed
    });

    // Define a method or hook for handling expiration logic if needed

    return Users;
}
