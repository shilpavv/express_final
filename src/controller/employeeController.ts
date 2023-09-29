import { Request, Response } from 'express';
import { Employee } from '../entities/Employee';
import { validationResult } from 'express-validator';
export class EmployeeController{
  
  async getEmployees(req: Request, res: Response) {
    try {
      const employees = await Employee.find();
      console.log(employees);
      res.status(200).json({ employees });
    } catch (error: any) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async createEmployee(req: Request, res: Response)  {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).json({ errors: errors.array() });
    }
    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.age = req.body.age;
    newEmployee.dob = req.body.dob;
    newEmployee.email = req.body.email;
    newEmployee.mob = req.body.mob;
    newEmployee.gender = req.body.gender;
    newEmployee.department = req.body.department;
    newEmployee.active = true; 
    newEmployee.save() .then(savedEmployee => {
        res.status(201).json({ message: 'Employee added successfully', employee: savedEmployee });
      })
      .catch(error => {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
      
    }
    async updateEmployee(req: Request, res: Response) {
      // Extract the employeeId from the request parameters
      const employeeId: number = parseInt(req.params.id);
      try {
        // Find the employee by ID
        const employee = await Employee.findOne({ where: { id: employeeId } });
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
        await employee.save();
        // Return success response
        res.status(200).json({ message: 'Employee updated successfully', employee });
      } catch (error: any) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    async deactivateEmployee (req: Request, res: Response)  {
        const employeeId: number = parseInt(req.params.id);
        const employee = await Employee.findOne({ where: { id: employeeId } });
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        employee.name = req.body.name ;
        employee.age = req.body.age;
        employee.dob = req.body.dob;
        employee.email = req.body.email;
        employee.mob = req.body.mob;
        employee.gender = req.body.gender;
        employee.department = req.body.department;
        employee.active=false
        employee.save() .then(savedEmployee => {
          res.status(201).json({ message: 'Employee  successfully deactive', employee: savedEmployee });
        })
        .catch(error => {
          console.error('Error adding employee:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
      }
  
  }
 
    
  