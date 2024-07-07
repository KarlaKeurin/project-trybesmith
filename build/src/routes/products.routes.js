"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const products_middleware_1 = __importDefault(require("../middlewares/products.middleware"));
const productsRouter = (0, express_1.Router)();
productsRouter.post('/products', products_middleware_1.default.validateCreateProduct, products_middleware_1.default.userIdValidation, products_controller_1.default.create);
productsRouter.get('/products', products_controller_1.default.findAll);
exports.default = productsRouter;
