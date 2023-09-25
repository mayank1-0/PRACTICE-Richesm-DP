module.exports = (sequelize, Sequelize) => {
    const productModel = sequelize.define("product", {
        product_code: {
            type: Sequelize.STRING,

        },
        barcode: {
            type: Sequelize.STRING,
        },
        product_name: {
            type: Sequelize.STRING,


        },
        seller_id: {
            type: Sequelize.INTEGER
            
        },
        main_category_id: {
            type: Sequelize.INTEGER,


        },
        category_id: {
            type: Sequelize.INTEGER,


        },
        sub_category_id: {
            type: Sequelize.INTEGER,


        },
        brand_id: {
            type: Sequelize.STRING,


        },
        unit_id: {
            type: Sequelize.INTEGER,


        },
        weight_in_kg: {
            type: Sequelize.STRING,


        },
        min_pur_qty: {
            type: Sequelize.INTEGER,
            defaultValue: 1

        },
        tags: {
            type: Sequelize.TEXT,


        },
        has_colors: {
            type: Sequelize.INTEGER,
            defaultValue: 0

        },
        colors: {
            type: Sequelize.TEXT,


        },
        has_attributes: {
            type: Sequelize.INTEGER,
            defaultValue: 0

        },
        attributes: {
            type: Sequelize.TEXT,


        },
        unit_mrp: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00

        },
        discount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00

        },
        discount_type: {
            type: Sequelize.STRING,


        },
        tax: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00

        },
        tax_type: {
            type: Sequelize.STRING,


        },
        listing_price_exc_tax: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00

        },
        listing_price_inc_tax: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00

        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0

        },
        low_stock_warning_qty: {
            type: Sequelize.INTEGER,
            defaultValue: 1

        },
        sku: {
            type: Sequelize.STRING,


        },
        hsn: {
            type: Sequelize.STRING,


        },
        product_description: {
            type: Sequelize.TEXT,


        },
        product_specification: {
            type: Sequelize.TEXT,


        },
        meta_title: {
            type: Sequelize.TEXT,


        },
        meta_description: {
            type: Sequelize.TEXT,


        },
        meta_keyword: {
            type: Sequelize.TEXT,


        },
        other_meta_tag: {
            type: Sequelize.TEXT,


        },
        product_video_provider: {
            type: Sequelize.STRING,


        },
        video_link: {
            type: Sequelize.TEXT,


        },
        thumbnail_images: {
            type: Sequelize.STRING,


        },
        shipping_charge_type: {
            type: Sequelize.STRING,


        },
        shipping_cost: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00

        },
        shipping_is_product_qty_multiply: {
            type: Sequelize.INTEGER,
            defaultValue: 0

        },
        shipping_estimate_time_in_days: {
            type: Sequelize.INTEGER,
            defaultValue: 1

        },
        product_region: {
            type: Sequelize.STRING,
        },
        product_state: {
            type: Sequelize.STRING,
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
            
        }
    }
    );
    return productModel;
}
