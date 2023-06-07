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
exports.episodesController = void 0;
const episodeService_1 = require("../services/episodeService");
exports.episodesController = {
    // GET /episodes/stream?videoUrl=
    stream: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { videoUrl } = req.query;
        const range = req.headers.range; // retorno é uma string -> bytes=0-1024...
        try {
            if (typeof videoUrl !== "string")
                throw new Error("videoUrl deve ser do tipo 'string'");
            episodeService_1.episodeService.streamEpisodeToResponse(res, videoUrl, range);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    // GET /episodes/:id/watchTime
    getWatchTime: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const episodeId = req.params.id;
        try {
            const watchTime = yield episodeService_1.episodeService.getWatchTime(userId, Number(episodeId));
            return res.json(watchTime);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    // POST /episodes/:id/watchTime
    setWatchTime: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const episodeId = Number(req.params.id);
        const { seconds } = req.body;
        try {
            const watchTime = yield episodeService_1.episodeService.setWatchTime({
                userId,
                episodeId,
                seconds,
            });
            return res.json(watchTime);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json(error);
        }
    }),
};
