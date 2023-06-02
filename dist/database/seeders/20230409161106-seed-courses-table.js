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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const [categories] = yield queryInterface.sequelize.query("SELECT id FROM categories");
            yield queryInterface.bulkInsert("courses", [
                {
                    name: "Programador Full-stack Javascript",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    featured: true,
                    category_id: categories[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Dominando a Linguagem Ruby",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Micro-serviços com Node.js",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    featured: true,
                    category_id: categories[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Criando APIs Profissionais com Ruby on Rails",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    featured: true,
                    category_id: categories[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "TDD na Prática: Testando APIs Node.js",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    featured: true,
                    category_id: categories[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "TDD na Prática: Testando Aplicações React",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    featured: true,
                    category_id: categories[1].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Especialista Front-end: Vue.js",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[1].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Criando Sites e Apps 3D com Three.js",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[1].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Dominando o Bootstrap 5",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[1].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Visual Studio Code para Programadores Javascript",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[2].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Comandos do Terminal Linux: Um Guia Completo",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[2].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Comunicação e Trabalho em Equipe",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[3].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Programador Nômade",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    featured: true,
                    category_id: categories[4].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "O Guia do Programador Freelancer",
                    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    category_id: categories[4].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("courses", null, {});
        });
    },
};
