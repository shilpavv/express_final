import { Router } from "express";
import AuthController  from "../controller/authController"; 
export class AuthRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/login", AuthController.login);
  }
}
