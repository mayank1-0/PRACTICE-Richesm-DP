const db = require('../../../dbconfig/connection');

const cartCustomerDetails = async (req, res) => {
    try {
        

    } catch (error) {
        res
            .status(500)
            .send({ success: false, data: error, message: "Something went wrong" });
    }
};

module.exports = { cartCustomerDetails };
