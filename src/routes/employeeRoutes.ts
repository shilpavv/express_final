import express from "express";
import { EmployeeController } from "../controller/employeeController";
import { check } from "express-validator";
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
// Define a class to handle employee routes
export class EmployeeRouter {
  //define and manage routes
  router: Router;
  employeeController: EmployeeController = new EmployeeController();// Create an instance of EmployeeController
  constructor() {
    this.router = Router();
    this.routes(); // Call the routes method
  }
// Define  route
  routes() {
    this.router.get("/employees",verifyToken, this.employeeController.getEmployees);
    this.router.post(
      "/employees",verifyToken,
      [
        check("name", "Name must contain only characters").custom(value => /^[a-zA-Z]+$/.test(value)),
        check("age", "Age must be numeric").isNumeric(),
        check("email", "Enter Valid Email").isEmail().normalizeEmail(),
        check("dob", "Enter Valid Date of Birth").isDate(),
        check("mob", "Enter Valid Mobile Number").notEmpty(),
        check("gender", "Gender is required").notEmpty(),
        check("department", "Department is required").notEmpty(),
      ],
      this.employeeController.createEmployee
    );
    this. router.put("/employees/:id",verifyToken,this.employeeController.updateEmployee);
   this.router.post("/employees/:id",verifyToken,this.employeeController. deactivateEmployee);
  }
}
