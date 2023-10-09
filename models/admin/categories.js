// const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
    const categoriesModel = sequelize.define("categories", {
        main_category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        meta_title: {
            type: Sequelize.STRING,
        },
        meta_description: {
            type: Sequelize.STRING,
        },
        meta_keyword: {
            type: Sequelize.STRING,
        },
        other_meta_tags: {
            type: Sequelize.STRING,
        },
        page_content: {
            type: Sequelize.STRING,
        },
        created_by: {
            type: Sequelize.BIGINT,
        },
    },
        // {
        //     hooks: {
        //         beforeCreate(categories, options) {
        //             try {
        //                 if (categories.toJSON().image) {
        //                     let timestampImage = moment.format().concat(categories.toJSON().image);
        //                     categories.set("image", timestampImage);
        //                     return "Hurray"
        //                 }
        //             }
        //             catch (err) {
        //                 throw new Error();
        //             };
        //         },
        //         beforeUpdate(categories, options) {

        //             try {
        //                 if (categories.toJSON().image) {
        //                     let timestampImage = moment.format().concat(categories.toJSON().image);
        //                     categories.set("image", timestampImage);
        //                     return "Hurray"
        //                 }
        //             }
        //             catch (err) {
        //                 throw new Error();
        //             };

        //         },
        //     },
        // }

    );
    return categoriesModel;
};
