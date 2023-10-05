const db = require('../../../dbconfig/connection');
const moment = require("moment");
const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

const customerSignup = async (req, res) => {
    try {
        let postData = req.body;
        postData.userID = `${moment().unix()}-${randomstring.generate({
            length: 6,
            readable: true,
            capitalization: "uppercase",
            charset: "alphanumeric",
        })}`;
        if (postData.role === undefined) {
            postData.role = 3;
        }
        const userData = await db.User.create(postData);
        const token = await jwt.sign(
            { userId: userData.userID, isActive: true },
            config.jwtSecret,
            { expiresIn: "24h" }
        );
        // let sessionData = req.session;
        // sessionData.user = {};
        // sessionData.user.email = userData.email;
        // sessionData.token = token;

        const options = {
            expire: new Date(
                Date.now() + 4 * 24 * 60 * 60 * 1000
            )
        };

        res.status(201).cookie('token', token, options).send({
            status: 200,
            data: userData,
            message: "Customer created successfully",
        })
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res.status(500).send({
                status: 500,
                data: e.name,
                message: "Customer with same Mobile or EmailID already exists",
            });
        } else if (e.name === "SequelizeValidationError") {
            res.status(500).send({
                status: 500,
                data: e.name,
                message: `Invalid ${e.errors[0].path}`,
            });
        } else {
            res
                .status(500)
                .send({ status: 500, data: e, message: "API Error Message" });
        }
    }
};

const customerLogin = async (req, res) => {
    try {
        let customerData = req.body;
        const User = db.User;
        let customerCredentials = await User.findOne({
            plain: true,
            where: { email: customerData.email },
            attributes: ["id", "userID", "email", ["password", "hashedPass"]],
        });
        if (!customerCredentials) {
            res.status(404).send({ message: "Invalid Credentials" });
        } else {
            customerCredentials = customerCredentials.toJSON();
            const match = await bcrypt.compare(
                customerData.password,
                customerCredentials.hashedPass
            );
            if (!match) {
                res.status(404).send({
                    success: false,
                    message: "Invalid Credentials",
                });
            } else {
                const token = await jwt.sign(
                    { userId: customerCredentials.userID, isActive: true },
                    config.jwtSecret,
                    { expiresIn: "24h" }
                );
                // let sessionData = req.session;
                // sessionData.user = {};
                // sessionData.user.email = customerCredentials.email;
                // sessionData.token = token;

                const options = {
                    expire: new Date(
                        Date.now() + 4 * 24 * 60 * 60 * 1000
                    )
                };

                res.status(200).cookie('token', token, options).send({
                    success: true,
                    // email: customerCredentials.email,
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
};

const customerLogout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    } catch (err) {
        res
            .status(500)
            .send({ error: err, message: "Logout Failed. Please try again" });
    }
};

module.exports = { customerSignup, customerLogin, customerLogout };