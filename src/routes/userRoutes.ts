import { Router } from "express";
import { UserController } from "../controller/userController";
import { verifyToken } from "../middleware/authMiddleware";

export class UserRouter {
  router: Router;
  userController: UserController = new UserController();
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/user",verifyToken ,this.userController.getUsers);
    this.router.post("/user", verifyToken,this.userController.createUsers );;
  }
}
