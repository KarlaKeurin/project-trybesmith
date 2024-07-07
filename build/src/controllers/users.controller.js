"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await users_service_1.default.login(username, password);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(401).json({ message: 'Username or password invalid' });
    }
};
const findAll = async (req, res) => {
    const users = await users_service_1.default.findAll();
    return res.status(200).json(users);
};
exports.default = {
    login,
    findAll,
};
