import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface WatchTimeAttributes {
  seconds: number;
  userId: number;
  episodeId: number;
  updatedAt?: Date; // Adicionei essa linha para incluir a propriedade updatedAt em userService.ts
}

export interface WatchTimeInstance
  extends Model<WatchTimeAttributes>,
    WatchTimeAttributes {}

export const WatchTime = sequelize.define<
  WatchTimeInstance,
  WatchTimeAttributes
>("WatchTime", {
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  episodeId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "episodes",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
