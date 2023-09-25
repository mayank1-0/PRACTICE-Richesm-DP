module.exports = (sequelize, Sequelize) => {
    const colorModel = sequelize.define("color", {
        name: {
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
  return colorModel;
}
