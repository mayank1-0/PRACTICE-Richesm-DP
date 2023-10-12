const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define("user", {
    userID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      },
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: 10
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // is: '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'
      }
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true
      }
    },
    my_referral_code: {
      type: Sequelize.STRING,
    },
    applied_referral_code: {
      type: Sequelize.STRING,
    },
    remember_token: {
      type: Sequelize.STRING,
    },
  },

    {
      hooks: {
        beforeCreate(user, options) {
          //function called before creating a table.
          if (user.toJSON().password) {
            return bcrypt
              .hash(user.toJSON().password, 10)
              .then((hash) => {
                user.set("password", hash);
              })
              .catch((err) => {
                throw new Error();
              });
          }
        },
        beforeUpdate(user, options) {
          //function called before updating a table.
          if (user.toJSON().password) {
            return bcrypt
              .hash(user.toJSON().password, 10)
              .then((hash) => {
                user.set("password", hash);
              })
              .catch((err) => {
                throw new Error();
              });
          }
        },
      },
    }
  );
  return userModel;
};
