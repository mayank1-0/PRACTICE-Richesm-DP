module.exports = (sequelize, Sequelize) => {
    const productModel = sequelize.define("products", {
        product_code: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        barcode: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        product_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        seller_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        main_category_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        category_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        sub_category_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        brand_id: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        unit_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        weight_in_kg: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        min_pur_qty: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        tags: {
            type: Sequelize.TEXT,
            defaultValue: null,
        },
        has_colors: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        colors: {
            type: Sequelize.TEXT,
            defaultValue: null,
        },
        has_attributes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        attributes: {
            type: Sequelize.TEXT,
            defaultValue: null,
        },
        unit_price: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        discount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        discount_type: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        rate_exc_tax: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        tax: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        tax_type: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        listing_price_inc_tax: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        low_stock_warning_qty: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        sku: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        hsn: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        product_description: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        product_specification: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        meta_title: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        meta_description: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        meta_keyword: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        other_meta_tag: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        product_video_provider: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        video_link: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        thumbnail_images: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shipping_charge_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shipping_cost: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        shipping_is_product_qty_multiply: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        shipping_estimate_time_in_days: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        product_region: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        product_state: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        is_cash_on_delivery_available: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_featured: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_bestseller: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_new_arrival: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_trending: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_todays_deal: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_active: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        rating_star: {
            type: Sequelize.DECIMAL(2, 1),
            defaultValue: 3.0
        },
        slug: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
    }
    );
    return productModel;
};
