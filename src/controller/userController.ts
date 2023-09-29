 import { Request, Response } from "express";
import { User } from "../entities/User";
export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json({ users });
    } catch (error: any) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async createUsers(req: Request, res: Response) {
    const newUser = new User();
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
  }
  
}
