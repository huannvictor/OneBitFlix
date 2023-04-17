import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

Category.hasMany(Course, { as: "courses" });
Course.belongsTo(Category);

Course.hasMany(Episode, { as: "episodes" });
Episode.belongsTo(Course);

//* Relação entre cursos e usuários via tabela de favoritos
Course.belongsToMany(User, { through: Favorite });
User.belongsToMany(Course, { through: Favorite });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });
Favorite.belongsTo(Course);
Favorite.belongsTo(User);

//* Associação entre User & Course via Like
// como é mais simples não se fazem necessárias mais opções de associações como em Favorites
Course.belongsToMany(User, { through: Like });
User.belongsToMany(Course, { through: Like });

Episode.belongsToMany(User, { through: WatchTime });
User.belongsToMany(Episode, { through: WatchTime });

export { Category, Course, Episode, Favorite, Like, User, WatchTime };
