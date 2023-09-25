module.exports = (sequelize, Sequelize) => {
    const subUnitModel = sequelize.define("sub_unit", {
        unit_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        sub_unit_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sub_unit_short_char: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        conversion_factor: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
        },
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false,
        }
    }
  );
  return subUnitModel;
}
