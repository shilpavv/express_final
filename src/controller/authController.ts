import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { getRepository } from "typeorm";

export default class AuthController {
  public static login = async (req: Request, res: Response, next: any) => {
    const { userName, password } = req.body;
    console.log("req.body", req.body);

    try {
      const condition = { where: { userName } };
      const existingUser = await getRepository(User).findOne(condition);
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
      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.userName },
        secretKey,
        { expiresIn: "1h" }
      );
      // Send a successful response
      return res.status(200).json({
        success: true,
        data: {
          userId: existingUser.id,
          userName: existingUser.userName,
          token: token,
        },
      });
    } catch (err) {
      console.error("error:", err);
      // If an error occurs, send an error response
      return res.status(500).json({ error: "Error! Something went wrong." });
    }
  };
}
