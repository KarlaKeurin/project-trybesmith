"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const loginBodySchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
const validateLogin = (req, res, next) => {
    const { error } = loginBodySchema.validate(req.body);
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            return res.status(400).json({ message: '"username" and "password" are required' });
        }
        return res.status(401).json({ message: 'Username or password invalid' });
    }
    next();
};
exports.default = {
    validateLogin,
};
