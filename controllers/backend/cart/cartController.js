const db = require("../../../dbconfig/connection");

const fetchAllCarts = async (req, res) => {
    try {
        const Product = db.Product;
        const cartData = await db.Cart.findAll({
            include: Product
        });
        if (!cartData) {
            res.status(404).send({ success: false, message: "No carts are there in the database", status: 404 })
        } else {
            res.status(200).send({ status: 200, message: " Fetched All Carts", data: cartData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error.message })
    }
};

const cart_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        if (!tableData.user_id) return res.status(404).send({ success: false, message: 'Invalid user id' });
        if (!tableData.quantity) return res.status(404).send({ success: false, message: 'Invalid quantity' });
        result = await db.Cart.create(tableData);
        res.status(200).send({ message: "Filled data in cart table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
};

const cart_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        if (!updateData.quantity) return res.status(404).send({ success: false, message: 'Invalid quantity' })
        result = await db.Cart.update({
            quantity: updateData.quantity
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No cart with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in cart table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
};

const cart_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Cart.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Cart with the given id does not exist", success: false })
        } else {
            res.status(200).send({ message: "Data from cart table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
};

module.exports = {
    cart_store,
    cart_edit_update,
    cart_destroy,
    fetchAllCarts
}
