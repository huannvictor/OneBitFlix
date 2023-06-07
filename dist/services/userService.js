"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const models_1 = require("../models");
function filterLastEpisodesByCourse(episodes) {
    const coursesOnList = [];
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if (!coursesOnList.includes(episode.courseId)) {
            coursesOnList.push(episode.courseId);
            currentList.push(episode);
            return currentList;
        }
        const episodeFromSameCourse = currentList.find((ep) => ep.courseId === episode.courseId);
        if (episodeFromSameCourse.order > episode.order)
            return currentList;
        const listWithoutEpisodeFromSameCourse = currentList.filter((ep) => ep.courseId !== episode.courseId);
        listWithoutEpisodeFromSameCourse.push(episode);
        return listWithoutEpisodeFromSameCourse;
    }, []);
    return lastEpisodes;
}
exports.userService = {
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({ where: { email } });
        return user;
    }),
    create: (attributes) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.create(attributes);
        return user;
    }),
    update: (userId, attributes) => __awaiter(void 0, void 0, void 0, function* () {
        const [affectedRows, updatedUsers] = yield models_1.User.update(attributes, {
            where: { id: userId },
            returning: true,
        });
        return updatedUsers[0];
    }),
    updatePassword: (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
        const [affectedRows, updatedUsers] = yield models_1.User.update({ password }, {
            where: { id: userId },
            returning: true,
            individualHooks: true,
        });
        return updatedUsers[0];
    }),
    getKeepWatchingList: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userWithWatchedEpisodes = yield models_1.User.findByPk(userId, {
            include: {
                association: "episodes",
                attributes: [
                    "id",
                    "name",
                    "synopsis",
                    "order",
                    ["video_url", "videoUrl"],
                    ["seconds_long", "secondsLong"],
                    ["course_id", "courseId"],
                ],
                include: [
                    {
                        association: "Course",
                        attributes: [
                            "id",
                            "name",
                            "synopsis",
                            ["thumbnail_url", "thumbnailUrl"],
                        ],
                        as: "course",
                    },
                ],
                through: {
                    as: "watchTime",
                    attributes: ["seconds", ["updated_at", "updatedAt"]],
                },
            },
        });
        if (!userWithWatchedEpisodes)
            throw new Error("Usuário não encontrado.");
        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchedEpisodes.Episodes);
        keepWatchingList.sort((a, b) => {
            var _a, _b;
            return ((_a = a.watchTime) === null || _a === void 0 ? void 0 : _a.updatedAt) < ((_b = b.watchTime) === null || _b === void 0 ? void 0 : _b.updatedAt) ? 1 : -1;
        });
        return keepWatchingList;
    }),
};
