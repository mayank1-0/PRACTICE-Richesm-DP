module.exports = (sequelize, Sequelize) => {
    const brandModel = sequelize.define("brand", {
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
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
        },
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false,
        }
    }
  );
  return brandModel;
}
