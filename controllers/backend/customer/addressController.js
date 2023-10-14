const jwt = require('jsonwebtoken');
const config = require('../../../config.json');
const db = require('../../../dbconfig/connection');

const addAddressDetails = async (req, res) => {
    try {
        var addressData = req.body;
        let result1, result2;

        // fetching id from user table using jwt token
        let customerToken = req.cookies['customer-token'];
        const decodedData = await jwt.verify(customerToken, config.jwtSecret);
        result1 = await db.User.findOne({
            raw: true,
            where: { userID: decodedData.userId }
        });
        if (result1.length == 0) {
            return res.status(404).send({ success: false, message: 'No user exists related to this jwt token' });
        }
        addressData.user_id = result1.id;

        // validations
        if (!addressData.contact_person) return res.status(404).send({ success: false, message: "Kindly enter contact person name" });
        else if (!addressData.alternate_contact_number) return res.status(404).send({ success: false, message: "Kindly enter alternate contact number" });
        else if (!addressData.address) return res.status(404).send({ success: false, message: "Kindly enter address" });
        else if (!addressData.city) return res.status(404).send({ success: false, message: "Kindly enter city" });
        else if (!addressData.state) return res.status(404).send({ success: false, message: "Kindly enter state" });
        else if (!addressData.country) return res.status(404).send({ success: false, message: "Kindly enter country" });
        else if (!addressData.pincode) return res.status(404).send({ success: false, message: "Kindly enter pincode" });
        else if (!addressData.address_type) return res.status(404).send({ success: false, message: "Kindly enter address_type" });

        // storing
        result2 = await db.UserAddress.create(addressData);
        res.status(200).send({ message: "Address creation successful", data: result2, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
};

const updateAddressDetails = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;

        // validations
        if (!updateData.contact_person) return res.status(404).send({ success: false, message: "Kindly enter contact person name" });
        else if (!updateData.alternate_contact_number) return res.status(404).send({ success: false, message: "Kindly enter alternate contact number" });
        else if (!updateData.address) return res.status(404).send({ success: false, message: "Kindly enter address" });
        else if (!updateData.city) return res.status(404).send({ success: false, message: "Kindly enter city" });
        else if (!updateData.state) return res.status(404).send({ success: false, message: "Kindly enter state" });
        else if (!updateData.country) return res.status(404).send({ success: false, message: "Kindly enter country" });
        else if (!updateData.pincode) return res.status(404).send({ success: false, message: "Kindly enter pincode" });
        else if (!updateData.address_type) return res.status(404).send({ success: false, message: "Kindly enter address_type" });


        result = await db.UserAddress.update({
            contact_person: updateData.contact_person,
            alternate_contact_number: updateData.alternate_contact_number,
            address: updateData.address,
            city: updateData.city,
            state: updateData.state,
            country: updateData.country,
            pincode: updateData.pincode,
            address_type: updateData.address_type
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user address with the given id exists", data: result, success: false });
        } else {
            res.status(200).send({ message: "Updated data in user address table", data: result, success: true });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error.message, success: false });
    }
};

const deleteAddressDetails = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.UserAddress.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "User address with the given id does not exist", success: false })
        } else {
            res.status(200).send({ message: "Data from user address table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
};

const fetchAllUserAddresses = async (req, res) => {
    try {
        const userAddressData = await db.UserAddress.findAll(
            // {
            // attributes: [
            //     "id",
            //     ["unit_name", "unit"],
            //     ["short_char", "short_notation"],
            //     "status",
            //     ["createdAt", "createdOn"],
            //     ["updatedAt", "updatedOn"],
            // ],
            // }
        );
        if (!userAddressData) {
            res.status(404).send({ success: false, message: "No user addresses are there in the database", status: 404 })
        } else {
            res.status(200).send({ status: 200, message: " Fetched all user addresses", data: userAddressData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error.message })
    }
};

module.exports = { addAddressDetails, updateAddressDetails, deleteAddressDetails, fetchAllUserAddresses };
