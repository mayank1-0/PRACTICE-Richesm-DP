module.exports = (sequelize, Sequelize) => {
    const orderDetailsModel = sequelize.define("order_details", {
        order_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pcode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pvcode: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        price: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        qty: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 1.00
        },
        free_qty: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        sku: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        hsn: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        dis_wt: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        dis_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        dis_amt: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        taxable_amt: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        tax_wt: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        tax_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        tax_amt: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        shipping_charge: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0.00
        },
        line_total: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.00
        },
        is_free: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }
    );
    return orderDetailsModel;
}