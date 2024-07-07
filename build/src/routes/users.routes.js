"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const users_middleware_1 = __importDefault(require("../middlewares/users.middleware"));
const usersRouter = (0, express_1.Router)();
usersRouter.post('/login', users_middleware_1.default.validateLogin, users_controller_1.default.login);
usersRouter.get('/users', users_controller_1.default.findAll);
exports.default = usersRouter;
