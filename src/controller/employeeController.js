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
exports.EmployeeController = void 0;
const Employee_1 = require("../entities/Employee");
const express_validator_1 = require("express-validator");
class EmployeeController {
    getEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield Employee_1.Employee.find();
                console.log(employees);
                res.status(200).json({ employees });
            }
            catch (error) {
                console.error('Error fetching employees:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //validation
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(409).json({ errors: errors.array() });
            }
            const newEmployee = new Employee_1.Employee();
            newEmployee.name = req.body.name;
            newEmployee.age = req.body.age;
            newEmployee.dob = req.body.dob;
            newEmployee.email = req.body.email;
            newEmployee.mob = req.body.mob;
            newEmployee.gender = req.body.gender;
            newEmployee.department = req.body.department;
            newEmployee.active = true;
            newEmployee.save().then(savedEmployee => {
                res.status(201).json({ message: 'Employee added successfully', employee: savedEmployee });
            })
                .catch(error => {
                console.error('Error adding employee:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract the employeeId from the request parameters
            const employeeId = parseInt(req.params.id);
            try {
                // Find the employee by ID
                const employee = yield Employee_1.Employee.findOne({ where: { id: employeeId } });
                // If the employee is not found, return a 404 response
                if (!employee) {
                    return res.status(404).json({ error: 'Employee not found' });
                }
                // Update employee  with data from the request body
                employee.name = req.body.name;
                employee.age = req.body.age;
                employee.dob = req.body.dob;
                employee.email = req.body.email;
                employee.mob = req.body.mob;
                employee.gender = req.body.gender;
                employee.department = req.body.department;
                // Save the updated employee
                yield employee.save();
                // Return success response
                res.status(200).json({ message: 'Employee updated successfully', employee });
            }
            catch (error) {
                console.error('Error updating employee:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    deactivateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeId = parseInt(req.params.id);
            const employee = yield Employee_1.Employee.findOne({ where: { id: employeeId } });
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            employee.name = req.body.name;
            employee.age = req.body.age;
            employee.dob = req.body.dob;
            employee.email = req.body.email;
            employee.mob = req.body.mob;
            employee.gender = req.body.gender;
            employee.department = req.body.department;
            employee.active = false;
            employee.save().then(savedEmployee => {
                res.status(201).json({ message: 'Employee  successfully deactive', employee: savedEmployee });
            })
                .catch(error => {
                console.error('Error adding employee:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
        });
    }
}
exports.EmployeeController = EmployeeController;
