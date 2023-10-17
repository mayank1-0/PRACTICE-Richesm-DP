module.exports = (sequelize, Sequelize) => {
  const cartModel = sequelize.define("cart", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false
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
  return cartModel;
}