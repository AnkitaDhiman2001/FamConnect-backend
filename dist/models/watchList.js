"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const sequelize_1 = require("sequelize");
const Watchlists = database_1.default.define("watchlists", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    mediaId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mediaType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mediaTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mediaPoster: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true
});
exports.default = Watchlists;
//# sourceMappingURL=watchList.js.map