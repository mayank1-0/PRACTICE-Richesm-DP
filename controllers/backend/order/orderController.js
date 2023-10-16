
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
                "order_id",
                "billing_customer_name",
                "billing_last_name",
                "order_date",
                "total",
                "payment_status",
                "payment_method"
            ],
        });
        if (!orderData) {
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
        if (!order_id) return res.status(404).send({ success: false, message: `Invalid order id` })
        if (!order_date) return res.status(404).send({ success: false, message: `Invalid order date` })
        if (!billing_customer_name) return res.status(404).send({ success: false, message: `Invalid customer name` })
        if (!billing_last_name) return res.status(404).send({ success: false, message: `Invalid order id` })
        if (!billing_address) return res.status(404).send({ success: false, message: `Invalid order id` })
        if(!billing_city) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!billing_pincode) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!billing_state) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!billing_country) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!billing_email) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!billing_phone) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!shipping_is_billing) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!shipping_customer_name) return res.status(404).send({success: false, message: `Invalid order id`})
        if(!shipping_last_name) return res.status(404).send({success: false, message: `Invalid order id`})
            // shipping_address,
            // shipping_city,
            // shipping_pincode,
            // shipping_country,
            // shipping_state,
            // shipping_email,
            // shipping_phone,
            // payment_method,
            // coupon_code,
            // created_by

        const result = await db.Order.create(
            requestData
        );
        res.status(200).send({ message: "Order Added ", data: result, success: true });
    } catch (error) {
        console.log(error.message, ' ++++');
        res.status(500).send({ message: error, data: error, success: false });
    }
}

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
        result = await db.Brand.update({
            name: updateData.name,
            slug: updateData.slug,
            status: updateData.status,
            image: updateData.image
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in brand table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}

const order_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Brand.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Brand with given id does not exist", success: false, status: 404 });
        } else {
            res.status(200).send({ message: "Data from brand table deleted", success: true });
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
