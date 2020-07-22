const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.users_get_all = (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.users_register_user = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(400).json({
          message: "Email Already Exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role || "basic",
            });
            user
              .save()
              .then((user) => {
                res.status(201).json({
                  message: "User ccreated successfully",
                  data: user,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: err,
                });
              });
          }
        });
      }
    });
};

exports.users_login_user = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "This User does not exist !",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication Failed, Password Incorrect",
          });
        } else if (result) {
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            "secret"
            // { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            data: user,
          });
        } else
          res.status(401).json({
            message: "Authentication Failed",
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.users_get_user = (req, res) => {
  const { userId } = req.params;

  User.find({ _id: userId })
    .exec()
    .then((user) => {
      res.status(200).json({
        message: "User found",
        data: user[0],
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "User not found",
        data: err,
      });
    });
};

exports.users_delete_user = (req, res) => {
  const { userId } = req.params;
  User.deleteOne({ _id: userId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "User Account deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "No ticket found/Something went wrong",
      });
    });
};

exports.users_update_user_role = (req, res) => {
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
        message: "Something went wrong, User role not updated",
      });
    });
};
