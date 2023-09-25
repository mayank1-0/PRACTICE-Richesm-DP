const db = require('../../../dbconfig/connection');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../config.json");
const randomstring = require("randomstring");
const moment = require("moment");

const dashboard = (req, res) => {   
    res.render('./backend/dashboard', { title : process.env.APP_NAME+'| Dashboard' });
}

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
            name: "Admin",
            email: "admin@gmail.com",
            contactNumber: 888888888,
            password: "1234567890",
            address: "B211, Sector-221, Noida, U.P, India",
            status: 1
        };
        const result = await db.Admin.create(adminData);
        if (result) {
            res.status(200).send({ message: "Admin created successfully", data: result, success: true });
        }
        else {
            res.status(500).send({ message: "Admin creation unsuccessful, Something went wrong", data: result, success: false });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error, success: false });
    }
};

const adminLogin = async (req, res) => {
    try {
        var adminData = req.body;
        const Admin = db.Admin;
        let adminCredentials = await Admin.findOne({
            plain: true,
            where: { email: adminData.email },
            attributes: ["id", "email", ["password", "hashedPass"]],
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
                    { id: adminCredentials.id, isActive: true },
                    config.jwtSecret,
                    { expiresIn: "2h" }
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
};

module.exports = { dashboard, initializeAdmin, adminLogin };
