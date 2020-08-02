import jwt from "jsonwebtoken";
import { role } from "./role";
import { Response, NextFunction } from "express";

//This function takes in the role of the user passed in and to verify if the user is priviledge to perform certain tasks
export = (req: any, res: Response, next: NextFunction) => {
  try {
    //Get token from the header
    const token = req.headers.authorization.split(" ")[1];
    //Verify the token with jsonwebtoken
    const user: any = jwt.verify(token, "secret");

    if (user.role === role.ADMIN || user.role === role.AGENT) {
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      err: "You don't have the priviledge to access this route !!",
    });
  }
};
