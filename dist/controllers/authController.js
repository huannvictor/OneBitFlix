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
exports.authController = void 0;
const userService_1 = require("../services/userService");
const jwtService_1 = require("../services/jwtService");
exports.authController = {
    //POST /auth/register
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, phone, birth, email, password } = req.body;
        try {
            const userAlreadyExists = yield userService_1.userService.findByEmail(email);
            if (userAlreadyExists) {
                throw new Error("Este email ja foi cadastrado.");
            }
            const user = yield userService_1.userService.create({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: "user",
            });
            return res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(409).json({ message: error.message });
            }
        }
    }),
    //POST /auth/login
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield userService_1.userService.findByEmail(email);
            if (!user)
                return res.status(404).json({ message: "e-mail não registrado." });
            user.checkPassword(password, (err, isSame) => {
                if (err)
                    return res.status(400).json({ message: err.message });
                if (!isSame)
                    return res.status(401).json({ message: "senha incorreta" });
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                };
                const token = jwtService_1.jwtService.signToken(payload, "7d");
                return res.json(Object.assign(Object.assign({ authenticated: true }, payload), { token }));
            });
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
};
