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
exports.favoritesController = void 0;
const favoriteService_1 = require("../services/favoriteService");
exports.favoritesController = {
    // GET /favorites
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        try {
            const favorites = yield favoriteService_1.favoriteService.findUserById(userId);
            return res.json(favorites);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                return res.status(400).json({ message: error.message });
            }
        }
    }),
    // POST /favorites
    save: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const favorite = yield favoriteService_1.favoriteService.create(userId, Number(courseId));
            return res.status(201).json(favorite);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    //DELETE /favorites/:id
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const courseId = req.params.id;
        try {
            const favorite = yield favoriteService_1.favoriteService.delete(userId, Number(courseId));
            return res
                .status(201)
                .send(`Favorito com id: ${courseId} removido da lista de favoritos`);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
};
