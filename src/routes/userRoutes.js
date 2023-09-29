"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
class UserRouter {
    constructor() {
        this.userController = new userController_1.UserController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/user", authMiddleware_1.verifyToken, this.userController.getUsers);
        this.router.post("/user", authMiddleware_1.verifyToken, this.userController.createUsers);
        ;
    }
}
exports.UserRouter = UserRouter;
