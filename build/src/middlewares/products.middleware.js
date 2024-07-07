"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const createProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    price: joi_1.default.string().min(3).required(),
    userId: joi_1.default.number().required().options({ convert: false }),
});
const validateCreateProduct = (req, res, next) => {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(422).json({ message: error.message });
    }
    next();
};
const userIdValidation = async (req, res, next) => {
    const { userId } = req.body;
    const host = await user_model_1.default.findOne({
        where: { id: userId },
    });
    if (!host) {
        return res.status(422).json({ message: '"userId" not found' });
    }
    next();
};
exports.default = {
    validateCreateProduct,
    userIdValidation,
};
