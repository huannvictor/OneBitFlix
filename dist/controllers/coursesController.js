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
exports.coursesController = void 0;
const coursesService_1 = require("../services/coursesService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const likeService_1 = require("../services/likeService");
const favoriteService_1 = require("../services/favoriteService");
exports.coursesController = {
    // GET /courses/featured
    featured: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const featuredCourses = yield coursesService_1.courseService.getRandomFeaturedCourses();
            return res.json(featuredCourses);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    // GET /courses/newest
    newest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newestCourses = yield coursesService_1.courseService.getTopTenNewest();
            return res.json(newestCourses);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    // GET /courses/popular
    popular: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const topTen = yield coursesService_1.courseService.getTopTenByLikes();
            return res.json(topTen);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    // GET /courses/name
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name !== "string")
                throw new Error("name must be of string type.");
            const courseByName = yield coursesService_1.courseService.findByName(name, page, perPage);
            return res.json(courseByName);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    // GET /courses/:id
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const courseId = req.params.id;
        try {
            const course = yield coursesService_1.courseService.findByIdWithEpisodes(courseId);
            if (!course)
                return res.status(404).json({ message: "Curso não encontrado." });
            const favorite = yield favoriteService_1.favoriteService.isFavorited(userId, Number(courseId));
            const liked = yield likeService_1.likeService.isLiked(userId, Number(courseId));
            return res.json(Object.assign(Object.assign({}, course.get()), { favorite, liked }));
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
};
