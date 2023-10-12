module.exports = (sequelize, Sequelize) => {
    const countryModel = sequelize.define("country", {
        shortName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phonecode: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        currency_code: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        currency_symbol: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        flag: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }
    );
    return countryModel;
}
