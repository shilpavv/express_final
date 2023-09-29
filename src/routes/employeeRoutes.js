"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRouter = void 0;
const employeeController_1 = require("../controller/employeeController");
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
// Define a class to handle employee routes
class EmployeeRouter {
    constructor() {
        this.employeeController = new employeeController_1.EmployeeController(); // Create an instance of EmployeeController
        this.router = (0, express_1.Router)();
        this.routes(); // Call the routes method
    }
    // Define  route
    routes() {
        this.router.get("/employees", authMiddleware_1.verifyToken, this.employeeController.getEmployees);
        this.router.post("/employees", authMiddleware_1.verifyToken, [
            (0, express_validator_1.check)("name", "Name must contain only characters").custom(value => /^[a-zA-Z]+$/.test(value)),
            (0, express_validator_1.check)("age", "Age must be numeric").isNumeric(),
            (0, express_validator_1.check)("email", "Enter Valid Email").isEmail().normalizeEmail(),
            (0, express_validator_1.check)("dob", "Enter Valid Date of Birth").isDate(),
            (0, express_validator_1.check)("mob", "Enter Valid Mobile Number").notEmpty(),
            (0, express_validator_1.check)("gender", "Gender is required").notEmpty(),
            (0, express_validator_1.check)("department", "Department is required").notEmpty(),
        ], this.employeeController.createEmployee);
        this.router.put("/employees/:id", authMiddleware_1.verifyToken, this.employeeController.updateEmployee);
        this.router.post("/employees/:id", authMiddleware_1.verifyToken, this.employeeController.deactivateEmployee);
    }
}
exports.EmployeeRouter = EmployeeRouter;
