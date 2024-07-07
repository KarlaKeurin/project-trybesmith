"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
// import ProductModel from '../database/models/product.model';
// import { User } from '../types/User';
const secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'secret';
const login = async (username, password) => {
    const host = await user_model_1.default.findOne({
        where: { username },
    });
    if (!host)
        throw new Error('Username or password invalid');
    const isPasswordValid = await bcryptjs_1.default.compare(password, host.dataValues.password);
    if (!isPasswordValid)
        throw new Error('Username or password invalid');
    const token = jwt.sign({
        id: host.dataValues.id,
        username: host.dataValues.username,
        vocation: host.dataValues.vocation,
        level: host.dataValues.level,
    }, secret, {
        expiresIn: '1d',
    });
    return token;
};
const findAll = async () => {
    const users = await user_model_1.default.findAll({
        include: 'productIds', // Include associated products
    });
    return users.map((user) => ({
        username: user.username,
        productIds: user.productIds.map((product) => product.id), // Map product IDs
    }));
};
exports.default = {
    login,
    findAll,
};
