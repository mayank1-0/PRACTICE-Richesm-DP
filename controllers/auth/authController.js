const db = require('../../dbconfig/connection');
const moment = require("moment");
const randomstring = require("randomstring")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

const signup_get = (req, res) => {

    res.render('./auth/signup', { layout: false });
};

const login_get = (req, res) => {

    res.render('./auth/login', { layout: false });
};

const signup_post = async (req, res) => {


};

const initializeAdmin = async (req, res) => {
    try {
        const adminData = {
            userID: `${moment().unix()}-${randomstring.generate({
                //Generating random string. randomstring is a package used to generate a random string.To make it unique we have attached time stamp to it, moment().unix() is the current timestamp generated in milliseconds.
                length: 6,
                readable: true,
                capitalization: "uppercase",
                charset: "alphanumeric",
            })}`,
            role: 1,
            email: "admin@gmail.com",
            mobile: "5555555555",
            password: "1234567890",
        };
        const result = await db.User.create(adminData);
        if (result) {
            res.status(200).send({ message: "Admin created successfully", data: result, success: true });
        }
        else {
            res.status(500).send({ message: "Admin creation unsuccessful, Something went wrong", data: result, success: false });
        }
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res
              .status(500)
              .send({
                status: 500,
                success: false,
                data: e.name,
                message: "User with same Mobile or EmailID already exists",
              });
          } else if (e.name === "SequelizeValidationError") {
            res
              .status(500)
              .send({
                status: 500,
                
                data: e.name,
                message: `Invalid ${e.errors[0].path}`,
              });
          } else {
            res
              .status(500)
              .send({ status: 500, data: e, message: "Something went wrong" });
          }
        // res.status(500).send({ message: "Something went wrong", error: error, success: false });
    }
};

const adminLogin = async (req, res) => {
    try {
        var adminData = req.body;
        const User = db.User;
        let adminCredentials = await User.findOne({
            plain: true,
            where: { email: adminData.email },
            attributes: ["id", "userID", "email", ["password", "hashedPass"]],
        });
        if (!adminCredentials) {
            res.status(404).send({ message: "email is incorrect" });
        } else {
            adminCredentials = adminCredentials.toJSON();
            const match = await bcrypt.compare(
                adminData.password,
                adminCredentials.hashedPass
            );
            if (!match) {
                res.status(404).send({
                    success: false,
                    message: "Password is incorrect. Please try again",
                });
            } else {
                const token = jwt.sign(
                    { userId: adminCredentials.userID, isActive: true },
                    config.jwtSecret,
                    { expiresIn: "96h" }
                );
                let sessionData = req.session;
                sessionData.user = {};
                sessionData.user.email = adminCredentials.email;
                sessionData.token = token;

                res.status(200).send({
                    success: true,
                    email: adminCredentials.email,
                    token: token,
                    message: "Login Successfull",
                });
            }
        }
    } catch (error) {
        res
            .status(500)
            .send({ success: false, data: error, message: "Something went wrong" });
    }
}

const login_post = async (req, res) => {

    const { email, password } = req.body;
    res.send('user login');
}

const adminLogout = async (req, res) => {
    try {
      let sessionData = req.session;
      const logout = await sessionData.destroy();
      res.redirect("/");
    } catch (e) {
      res
        .status(500)
        .send({ error: e, message: "Logout Failed. Please try again" });
    }
  };

module.exports = { signup_get, login_get, signup_post, initializeAdmin, adminLogin, login_post, adminLogout };