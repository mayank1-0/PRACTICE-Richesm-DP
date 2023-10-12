module.exports = (sequelize, Sequelize) => {
    const userAddressModel = sequelize.define("user_address", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contact_person: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alternate_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: 10
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    }
   );
   return userAddressModel;
}