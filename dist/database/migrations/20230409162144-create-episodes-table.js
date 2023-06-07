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
            yield queryInterface.createTable("episodes", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.DataTypes.INTEGER,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.DataTypes.STRING,
                },
                synopsis: {
                    allowNull: false,
                    type: Sequelize.DataTypes.TEXT,
                },
                order: {
                    allowNull: false,
                    type: Sequelize.DataTypes.INTEGER,
                },
                video_url: {
                    type: Sequelize.DataTypes.STRING,
                },
                seconds_long: {
                    type: Sequelize.DataTypes.INTEGER,
                },
                course_id: {
                    allowNull: false,
                    type: Sequelize.DataTypes.INTEGER,
                    references: { model: "courses", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "RESTRICT",
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("episodes");
        });
    },
};
