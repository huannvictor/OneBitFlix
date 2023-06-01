"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchTime = exports.User = exports.Like = exports.Favorite = exports.Episode = exports.Course = exports.Category = void 0;
const Category_1 = require("./Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const Course_1 = require("./Course");
Object.defineProperty(exports, "Course", { enumerable: true, get: function () { return Course_1.Course; } });
const Episode_1 = require("./Episode");
Object.defineProperty(exports, "Episode", { enumerable: true, get: function () { return Episode_1.Episode; } });
const Favorite_1 = require("./Favorite");
Object.defineProperty(exports, "Favorite", { enumerable: true, get: function () { return Favorite_1.Favorite; } });
const Like_1 = require("./Like");
Object.defineProperty(exports, "Like", { enumerable: true, get: function () { return Like_1.Like; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const WatchTime_1 = require("./WatchTime");
Object.defineProperty(exports, "WatchTime", { enumerable: true, get: function () { return WatchTime_1.WatchTime; } });
Category_1.Category.hasMany(Course_1.Course, { as: "courses" });
Course_1.Course.belongsTo(Category_1.Category);
Course_1.Course.hasMany(Episode_1.Episode, { as: "episodes" });
Episode_1.Episode.belongsTo(Course_1.Course);
//* Relação entre cursos e usuários via tabela de favoritos
Course_1.Course.belongsToMany(User_1.User, { through: Favorite_1.Favorite });
User_1.User.belongsToMany(Course_1.Course, { through: Favorite_1.Favorite });
Course_1.Course.hasMany(Favorite_1.Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });
User_1.User.hasMany(Favorite_1.Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });
Favorite_1.Favorite.belongsTo(Course_1.Course);
Favorite_1.Favorite.belongsTo(User_1.User);
//* Associação entre User & Course via Like
// como é mais simples não se fazem necessárias mais opções de associações como em Favorites
Course_1.Course.belongsToMany(User_1.User, { through: Like_1.Like });
User_1.User.belongsToMany(Course_1.Course, { through: Like_1.Like });
Episode_1.Episode.belongsToMany(User_1.User, { through: WatchTime_1.WatchTime });
User_1.User.belongsToMany(Episode_1.Episode, { through: WatchTime_1.WatchTime });
