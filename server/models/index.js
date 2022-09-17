const User = require("./User");
const List = require("./List");
const Movie = require("./Movie");

// Movie.belongsToMany(User, { through: List });

// User.belongsToMany(Movie, { through: List });

// List.hasMany(Movie, {
//   foreignKey: "movie_id",
// });

// List.belongsTo(User, {
//   foreignKey: "user_id",
// }),

User.hasMany(Movie, {
  foreignKey: "user_id",
});

Movie.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Movie, User, List };
