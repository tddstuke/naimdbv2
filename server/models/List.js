const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class List extends Model {}

List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // movie_id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: "movie",
    //     key: "id",
    //   },
    // },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "list",
  }
);

module.exports = List;
