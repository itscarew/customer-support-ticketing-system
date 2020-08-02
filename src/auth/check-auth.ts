import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

//Verification of a user, to check if a user exists and the user is logged in or not
export = (req: any, res: Response, next: NextFunction) => {
  try {
    //Get token from the header
    const token = req.headers.authorization.split(" ")[1];
    //Verify the token with jsonwebtoken
    const user = jwt.verify(token, "secret");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};
