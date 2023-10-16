module.exports = (sequelize, Sequelize) => {
  const wishlistModel = sequelize.define("wishlist", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    sku: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    hsn: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    quantity: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
    sku: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    hsn: {
      type: Sequelize.STRING,
      defaultValue: null
    },
  }
  );
  return wishlistModel;
}