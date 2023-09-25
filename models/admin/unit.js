module.exports = (sequelize, Sequelize) => {
    const unitModel = sequelize.define("unit", {
        unit_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        short_char: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false,
        }
    }
  );
  return unitModel;
}
