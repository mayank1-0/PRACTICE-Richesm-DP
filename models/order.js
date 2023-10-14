module.exports = (sequelize, Sequelize) => {
    const orderModel = sequelize.define("order", {
        order_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        order_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        billing_customer_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        billing_last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        billing_address: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        billing_address_2: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        billing_city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        billing_pincode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        billing_state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        billing_country: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        billing_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        billing_phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipping_is_billing: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shipping_customer_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipping_last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipping_address: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        shipping_address_2: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        shipping_city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipping_pincode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shipping_country: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        shipping_state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipping_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipping_phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        payment_method: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sub_total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        total_pdt_dicount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        tax_amount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        total_discount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        coupon_code: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        coupon_discount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        points_redeemed: {
            type: Sequelize.DECIMAL,
            defaultValue: 0.00
        },
        shipping_charges: {
            type: Sequelize.DECIMAL,
            defaultValue: 0
        },
        giftwrap_charges: {
            type: Sequelize.DECIMAL,
            defaultValue: 0
        },
        transaction_charges: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        total: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        order_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        order_note: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        rezorpay_order_id: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        rezorpay_payment_id: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        rezorpay_signature: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        rezorpay_order_status: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        rezorpay_payment_status: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        payment_status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        order_status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        shp_rkt_order_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shp_rkt_shipment_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shp_rkt_awb_code: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shp_rkt_status: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shp_rkt_status_code: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        shp_rkt_courier_company_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shp_rkt_courier_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    }
    );
    return orderModel;
}