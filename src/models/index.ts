import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { User } from "./User";

Category.hasMany(Course, { as: "courses" });
Course.belongsTo(Category);

Course.hasMany(Episode, { as: "episodes" }); //* 'Episodes': seria a forma padrão da associação
Episode.belongsTo(Course);

//* Relação entre cursos e usuários via tabela de favoritos
Course.belongsToMany(User, { through: Favorite });
User.belongsToMany(Course, { through: Favorite });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

export { Category, Course, Episode, Favorite, User };
