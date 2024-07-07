"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../database/models/product.model"));
const create = async (input) => {
    const created = await product_model_1.default.create({
        name: input.name,
        price: input.price,
        userId: input.userId,
    });
    return {
        id: created.dataValues.id,
        name: created.dataValues.name,
        price: created.dataValues.price,
        userId: created.dataValues.userId,
    };
};
const findAll = async () => {
    const products = await product_model_1.default.findAll();
    return products.map((product) => ({
        id: product.dataValues.id,
        name: product.dataValues.name,
        price: product.dataValues.price,
        userId: product.dataValues.userId,
    }));
};
exports.default = {
    create,
    findAll,
};
