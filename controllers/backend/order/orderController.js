
const db = require("../../../dbconfig/connection");
const order = require("../../../models/order");
const path = require("path")

const order_index = (req, res) => {

    var result = null;
    res.render('./backend/order/index', { title: 'Order List', order: result })
}

const fetchAllOrders = async (req, res) => {
    try {
        const orderData = await db.Order.findAll({
            attributes: [
                "id",
                "order_id",
                "billing_customer_name",
                "billing_last_name",
                "billing_email",
                "billing_phone",
                "order_date",
                "total",
                "payment_status",
                "payment_method"
            ],
        });
        if (orderData.length == 0) {
            res.status(404).send({ success: false, status: 404, message: "No orders are there in the database" });
        }
        else {
            res.status(200).send({ status: 200, message: " Fetched All Orders", data: orderData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

// const brand_create_frm = (req, res) => {

//     res.render('./backend/brand/create', { title: 'Create a New Brand' });
// }

const order_store = async (req, res) => {
    try {
        const requestData = req.body;
        if (!requestData.order_id) return res.status(404).send({ success: false, message: `Invalid order id` })
        if (!requestData.order_date) return res.status(404).send({ success: false, message: `Invalid order date` })
        if (!requestData.billing_customer_name) return res.status(404).send({ success: false, message: `Invalid billing_customer_name` })
        if (!requestData.billing_last_name) return res.status(404).send({ success: false, message: `Invalid billing_last_name` })
        if (!requestData.billing_address) return res.status(404).send({ success: false, message: `Invalid billing_address` })
        if (!requestData.billing_city) return res.status(404).send({ success: false, message: `Invalid billing_city` })
        if (!requestData.billing_pincode) return res.status(404).send({ success: false, message: `Invalid billing_pincode` })
        if (!requestData.billing_state) return res.status(404).send({ success: false, message: `Invalid billing_state` })
        if (!requestData.billing_country) return res.status(404).send({ success: false, message: `Invalid billing_country` })
        if (!requestData.billing_email) return res.status(404).send({ success: false, message: `Invalid billing_email` })
        if (!requestData.billing_phone) return res.status(404).send({ success: false, message: `Invalid billing_phone` })
        if (!requestData.shipping_is_billing) return res.status(404).send({ success: false, message: `Invalid shipping_is_billing` })
        if (!requestData.shipping_customer_name) return res.status(404).send({ success: false, message: `Invalid shipping_customer_name` })
        if (!requestData.shipping_last_name) return res.status(404).send({ success: false, message: `Invalid shipping_last_name` })
        if (!requestData.shipping_address) return res.status(404).send({ success: false, message: `Invalid shipping_address` })
        if (!requestData.shipping_city) return res.status(404).send({ success: false, message: `Invalid shipping_city` })
        if (!requestData.shipping_pincode) return res.status(404).send({ success: false, message: `Invalid shipping_pincode` })
        if (!requestData.shipping_country) return res.status(404).send({ success: false, message: `Invalid shipping_country` })
        if (!requestData.shipping_state) return res.status(404).send({ success: false, message: `Invalid shipping_state` })
        if (!requestData.shipping_email) return res.status(404).send({ success: false, message: `Invalid shipping_email` })
        if (!requestData.shipping_phone) return res.status(404).send({ success: false, message: `Invalid shipping_phone` })
        if (!requestData.payment_method) return res.status(404).send({ success: false, message: `Invalid payment_method` })
        if (!requestData.coupon_code) return res.status(404).send({ success: false, message: `Invalid coupon_code` })
        if (!requestData.created_by) return res.status(404).send({ success: false, message: `Invalid created_by` })
        const result = await db.Order.create(
            requestData
        );
        res.status(200).send({ message: "Order Added ", data: result, success: true });
    } catch (error) {
        res.status(500).send({ message: error.message, data: error, success: false });
    }
};

// const brand_edit_frm = async (req, res) => {
//     const brandId = req.params.id;
//     const brand = await db.Brand.findOne({
//         where: {
//             id: brandId
//         }
//     })
//     res.render('./backend/brand/edit', { title: 'Create a New Brand', brandId: brandId, brand });
// }

const order_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        if (!updateData.order_id) return res.status(404).send({ success: false, message: `Invalid order id` })
        if (!updateData.order_date) return res.status(404).send({ success: false, message: `Invalid order date` })
        if (!updateData.billing_customer_name) return res.status(404).send({ success: false, message: `Invalid billing_customer_name` })
        if (!updateData.billing_last_name) return res.status(404).send({ success: false, message: `Invalid billing_last_name` })
        if (!updateData.billing_address) return res.status(404).send({ success: false, message: `Invalid billing_address` })
        if (!updateData.billing_city) return res.status(404).send({ success: false, message: `Invalid billing_city` })
        if (!updateData.billing_pincode) return res.status(404).send({ success: false, message: `Invalid billing_pincode` })
        if (!updateData.billing_state) return res.status(404).send({ success: false, message: `Invalid billing_state` })
        if (!updateData.billing_country) return res.status(404).send({ success: false, message: `Invalid billing_country` })
        if (!updateData.billing_email) return res.status(404).send({ success: false, message: `Invalid billing_email` })
        if (!updateData.billing_phone) return res.status(404).send({ success: false, message: `Invalid billing_phone` })
        if (!updateData.shipping_is_billing) return res.status(404).send({ success: false, message: `Invalid shipping_is_billing` })
        if (!updateData.shipping_customer_name) return res.status(404).send({ success: false, message: `Invalid shipping_customer_name` })
        if (!updateData.shipping_last_name) return res.status(404).send({ success: false, message: `Invalid shipping_last_name` })
        if (!updateData.shipping_address) return res.status(404).send({ success: false, message: `Invalid shipping_address` })
        if (!updateData.shipping_city) return res.status(404).send({ success: false, message: `Invalid shipping_city` })
        if (!updateData.shipping_pincode) return res.status(404).send({ success: false, message: `Invalid shipping_pincode` })
        if (!updateData.shipping_country) return res.status(404).send({ success: false, message: `Invalid shipping_country` })
        if (!updateData.shipping_state) return res.status(404).send({ success: false, message: `Invalid shipping_state` })
        if (!updateData.shipping_email) return res.status(404).send({ success: false, message: `Invalid shipping_email` })
        if (!updateData.shipping_phone) return res.status(404).send({ success: false, message: `Invalid shipping_phone` })
        if (!updateData.payment_method) return res.status(404).send({ success: false, message: `Invalid payment_method` })
        if (!updateData.coupon_code) return res.status(404).send({ success: false, message: `Invalid coupon_code` })
        if (!updateData.created_by) return res.status(404).send({ success: false, message: `Invalid created_by` })

        result = await db.Order.update({
            order_id: updateData.order_id,
            order_date: updateData.order_date,
            billing_customer_name: updateData.billing_customer_name,
            billing_last_name: updateData.billing_last_name,
            billing_address: updateData.billing_address,
            billing_city: updateData.billing_city,
            billing_pincode: updateData.billing_pincode,
            billing_state: updateData.billing_state,
            billing_country: updateData.billing_country,
            billing_email: updateData.billing_email,
            billing_phone: updateData.billing_phone,
            shipping_is_billing: updateData.shipping_is_billing,
            shipping_customer_name: updateData.shipping_customer_name,
            shipping_last_name: updateData.shipping_last_name,
            shipping_address: updateData.shipping_address,
            shipping_city: updateData.shipping_city,
            shipping_pincode: updateData.shipping_pincode,
            shipping_country: updateData.shipping_country,
            shipping_state: updateData.shipping_state,
            shipping_email: updateData.shipping_email,
            shipping_phone: updateData.shipping_phone,
            payment_method: updateData.payment_method,
            coupon_code: updateData.coupon_code,
            created_by: updateData.created_by
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No order with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in order table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error.message, success: false });
    }
}

const order_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Order.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Order with given id does not exist", success: false, status: 404 });
        } else {
            res.status(200).send({ message: "Data from order table deleted", success: true });
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

module.exports = {

    order_index,
    // order_create_frm,
    order_store,
    // order_edit_frm,
    order_edit_update,
    order_destroy,
    fetchAllOrders
}
