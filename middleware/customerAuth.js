const jwt = require('jsonwebtoken');
const config = require('../config.json');
const db = require('../dbconfig/connection');

const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(403).send({ message: "Please Login to access this resource", success: false });
        };
        const decodedData = await jwt.verify(token, config.jwtSecret);
        req.user = await db.User.findOne({
            where: { userID: decodedData.userId }
        });
        next();
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
};

module.exports = isAuthenticatedUser