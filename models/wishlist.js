module.exports = (sequelize, Sequelize) => {
    const wishlistModel = sequelize.define("wishlist", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      product_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_variant: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_type: {
        type: Sequelize.STRING,
        defaultValue: null
      }
    }
   );
   return wishlistModel;
}