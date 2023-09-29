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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
class AuthController {
}
_a = AuthController;
AuthController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    console.log("req.body", req.body);
    try {
        const condition = { where: { userName } };
        const existingUser = yield (0, typeorm_1.getRepository)(User_1.User).findOne(condition);
        console.log("user:", existingUser);
        console.log("condition:", condition);
        // If the user doesn't exist or the password is incorrect, throw an error
        if (!existingUser || existingUser.password !== password) {
            // const error = new Error("Wrong details, please check and try again");
            // return next(error);
            return res.status(401).json({ error: "Incorrect username or password" });
        }
        // Generate a JWT token
        const secretKey = "@SEIJIVS";
        const token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.userName }, secretKey, { expiresIn: "1h" });
        // Send a successful response
        return res.status(200).json({
            success: true,
            data: {
                userId: existingUser.id,
                userName: existingUser.userName,
                token: token,
            },
        });
    }
    catch (err) {
        console.error("error:", err);
        // If an error occurs, send an error response
        return res.status(500).json({ error: "Error! Something went wrong." });
    }
});
exports.default = AuthController;
