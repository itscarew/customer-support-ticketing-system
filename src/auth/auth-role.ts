import User from "../models/user"
import jwt from "jsonwebtoken"
import {Response, NextFunction} from "express"

//This function takes in the role of the user passed in and to verify if the user is priviledge to perform certain tasks
const authRole = (...role:any) => {
  return (req:any, res:Response, next:NextFunction) => {
    //Get token from the header
    const token = req.headers.authorization.split(" ")[1];
    //Verify the token with jsonwebtoken
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;

    User.find({ _id: req.userData.userId })
      .exec()
      .then((user) => {
        if (user[0].role === role[0] || user[0].role === role[1]) {
          console.log(user[0].role, role[1]);
          return next();
        } else {
          console.log(user[0].role, role);
          res.status(404).json({
            message: "You don't have such permission",
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          message: "Something Went Wrong",
        });
      });
  };
};


export = authRole;
