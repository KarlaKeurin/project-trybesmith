"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const user_model_1 = __importDefault(require("./user.model"));
const ProductModel = index_1.default.define('Product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: false,
    underscored: true,
});
user_model_1.default.hasMany(ProductModel, { foreignKey: 'userId', as: 'productIds' });
ProductModel.belongsTo(user_model_1.default, { foreignKey: 'userId' });
exports.default = ProductModel;
