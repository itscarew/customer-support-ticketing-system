import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Response } from "express";

import User from "../models/user";

export const users_get_all = (req: any, res: Response) => {
  User.find()
    .exec()
    .then((user) => {
      res.status(200).json({ users: user });
    }) 
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const users_register_user = (req: any, res: Response) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(400).json({
          err: "Email Already Exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              err: err,
            });
          } else {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            user
              .save()
              .then((user) => {
                res.status(201).json({
                  message: "User created successfully",
                  user: user,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  err: err,
                });
              });
          }
        });
      }
    });
};

export const users_login_user = (req: any, res: Response) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          err: "This User does not exist !",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            err: "Authentication Failed, Password Incorrect",
          });
        } else if (result) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email,
              joined: user.joined,
              userId: user._id,
              role : user.role
            },
            "secret"
            // { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            user: user,
          });
        } else
          res.status(401).json({
            err: "Authentication Failed",
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const users_get_logged_in_user_profile = (req: any, res: Response) => {
  User.findOne({ _id: req.user.userId })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ err: "No user is Logged In" });
      } else res.status(200).json({ user: user });
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
};

export const users_get_user = (req: any, res: Response) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({
          err: "No user exists",
        });
      }
      res.status(200).json({
        message: "User found",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const users_delete_user = (req: any, res: Response) => {
  const { userId } = req.params;
  User.deleteOne({ _id: userId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "User Account deleted successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        err: "No ticket found/Something went wrong",
      });
    });
};

export const users_update_user_role = (req: any, res: Response) => {
  const { userId } = req.params;
  User.updateOne({ _id: userId }, { $set: { role: req.body.role } })
    .exec()
    .then(() => {
      res.status(200).json({
        message: `User Account Role Updated to ${req.body.role} successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: "Something went wrong, User role not updated",
      });
    });
};
