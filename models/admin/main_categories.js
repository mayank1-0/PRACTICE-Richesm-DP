const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
    const mainCategoriesModel = sequelize.define("main_categories", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    },
        {
            hooks: {
                beforeCreate(main_categories, options) {
                    try {
                        if (main_categories.toJSON().image) {
                            let timestampImage = moment().format().concat(main_categories.toJSON().image);
                            main_categories.set("image", timestampImage);
                            return "Hurray"
                        }
                    }
                    catch (err) {
                        throw new Error();
                    };
                },
                beforeUpdate(main_categories, options) {

                    try {
                        if (main_categories.toJSON().image) {
                            let timestampImage = moment.format().concat(main_categories.toJSON().image);
                            main_categories.set("image", timestampImage);
                            return "Hurray"
                        }
                    }
                    catch (err) {
                        throw new Error();
                    };

                },
            },
        }
    );
    return mainCategoriesModel;
};
