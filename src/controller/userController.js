"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../entities/User");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.User.find();
                console.log(users);
                res.status(200).json({ users });
            }
            catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    createUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.User();
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.userName = req.body.userName;
            newUser.password = req.body.password;
            newUser.hashPassword();
            newUser
                .save()
                .then((savedUser) => {
                res
                    .status(201)
                    .json({ message: "User added successfully", user: savedUser });
            })
                .catch((error) => {
                console.error("Error adding user:", error);
                res.status(500).json({ error: "Internal server error" });
            });
        });
    }
}
exports.UserController = UserController;
