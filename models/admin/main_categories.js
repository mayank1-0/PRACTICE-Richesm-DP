// const moment = require("moment");

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
    }
    );
    return mainCategoriesModel;
};
