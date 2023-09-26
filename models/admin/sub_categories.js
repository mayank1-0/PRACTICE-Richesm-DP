const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
    const subCategoriesModel = sequelize.define("sub_categories", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        main_category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 1,
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
            type: Sequelize.TEXT,
        },
        meta_description: {
            type: Sequelize.TEXT,
        },
        meta_keyword: {
            type: Sequelize.TEXT,
        },
        other_meta_tags: {
            type: Sequelize.TEXT,
        },
        page_content: {
            type: Sequelize.TEXT,
        },
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    }
    );
    return subCategoriesModel;
};
