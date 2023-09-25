module.exports = (sequelize, Sequelize) => {
    const attributeModel = sequelize.define("attribute", {
        attribute_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        is_active: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }
  );
  return attributeModel;
}
