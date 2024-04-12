
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "posts",
    {
      postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userPhoto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postMedia: DataTypes.STRING,
      postLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      postComments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      postShare: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "posts",
      createdAt: "postTime", // This renames the createdAt field to postTime
      updatedAt: false,
      // Define hooks or methods for handling expiration logic if needed
    }
  );

  // Define a method or hook for handling expiration logic if needed

  return Posts;
};
