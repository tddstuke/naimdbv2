const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    // list_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "list",
    //     key: "id",
    //   },
    // },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: true,
    },

    overview: {
      type: DataTypes.STRING(1234),
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "movie",
  }
);

module.exports = Movie;
