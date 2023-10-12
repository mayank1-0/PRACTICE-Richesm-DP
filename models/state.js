module.exports = (sequelize, Sequelize) => {
    const stateModel = sequelize.define("state", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        country_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        region: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        state_slug: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        region_slug: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }      
    }
    );
    return stateModel;
}
