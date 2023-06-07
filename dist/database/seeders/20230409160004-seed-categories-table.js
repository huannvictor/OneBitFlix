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
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("categories", [
                {
                    name: "Tecnologias Back-end",
                    position: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Tecnologias Front-end",
                    position: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Ferramentas de Desenvolvimento",
                    position: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Soft-skills",
                    position: 4,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Carreira",
                    position: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("categories", null, {});
        });
    },
};
