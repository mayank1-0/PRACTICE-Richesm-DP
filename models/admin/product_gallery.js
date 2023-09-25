module.exports = (sequelize, Sequelize) => {
    const productGalleryModel = sequelize.define("product_gallery", {
        product_code: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        variant_id: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        color_id: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        image: {
            type: Sequelize.TEXT,
            defaultValue: null
        }
    }
  );
  return productGalleryModel;
}
