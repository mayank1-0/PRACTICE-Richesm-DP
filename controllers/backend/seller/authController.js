const db = require('../../../dbconfig/connection');
const moment = require("moment");
const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

const sellerSignup = async (req, res) => {
  try {
    let postData = req.body;
    console.log(' req.bosy is:', postData);
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
    console.log("DB operation: ", userData.toJSON());
    res.send({
      status: 200,
      data: userData,
      message: "Seller created successfully",
    });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(500).send({
        status: 500,
        data: e.name,
        message: "User with same Mobile or EmailID already exists",
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

const sellerLogin = async (req, res) => {
  try {
    let sellerData = req.body;
    const User = db.User;
    let sellerCredentials = await User.findOne({
      plain: true,
      where: { email: sellerData.email },
      attributes: ["id", "userID", "email", ["password", "hashedPass"]],
    });
    if (!sellerCredentials) {
      res.status(404).send({ message: "Invalid Credentials" });
    } else {
      sellerCredentials = sellerCredentials.toJSON();
      const match = await bcrypt.compare(
        sellerData.password,
        sellerCredentials.hashedPass
      );
      if (!match) {
        res.status(404).send({
          success: false,
          message: "Invalid Credentials",
        });
      } else {
        const token = jwt.sign(
          { userId: sellerCredentials.userID, isActive: true },
          config.jwtSecret,
          { expiresIn: "6h" }
        );
        let sessionData = req.session;
        sessionData.user = {};
        sessionData.user.email = sellerCredentials.email;
        sessionData.token = token;

        res.status(200).send({
          success: true,
          email: sellerCredentials.email,
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

const sellerLogout = async (req, res) => {
  try {
    let sessionData = req.session;
    await sessionData.destroy();
    res.redirect("/");
  } catch (e) {
    res
      .status(500)
      .send({ error: e, message: "Logout Failed. Please try again" });
  }
};

const fetchAllSellers = async (req, res) => {
  try {
    const sellerData = await db.User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "status",
        ["createdAt", "createdOn"],
        ["updatedAt", "updatedOn"],
      ],
      where: { role: 2 }
    });
    
    if (!sellerData) {
      res.status(404).send({ success: false, status: 404, message: "No sellers are there in the database" });
    }
    else {
      res.status(200).send({ status: 200, message: " Fetched All Sellers", data: sellerData });
    }
  }
  catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong", error: error })
  }
}

module.exports = { sellerSignup, sellerLogin, sellerLogout, fetchAllSellers };