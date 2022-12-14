const User = require("./User");
const List = require("./List");
const Movie = require("./Movie");
const Role = require("./Role");
const Show = require("./Show");
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

User.hasMany(Show, {
  foreignKey: "user_id",
});

Show.belongsTo(User, {
  foreignKey: "user_id",
});

// Role.belongsToMany(User, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId",
// });

// User.belongsToMany(Role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId",
// });

// ROLES = ["user", "admin", "moderator"];

module.exports = { Show, Movie, User, List, Role };
