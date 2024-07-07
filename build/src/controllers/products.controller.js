"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_1 = __importDefault(require("../services/products.service"));
const create = async (req, res) => {
    const createdProduct = await products_service_1.default.create(req.body);
    res.status(201).json(createdProduct);
};
const findAll = async (_req, res) => {
    const products = await products_service_1.default.findAll();
    res.status(200).json(products);
};
exports.default = {
    create,
    findAll,
};
