const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    port: process.env.DB_PORT
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// For Admin and more
const User = require("../models/user")(sequelize, Sequelize);
const Categories = require("../models/admin/categories")(sequelize, Sequelize);
const MainCategories = require("../models/admin/main_categories")(sequelize, Sequelize);
const SubCategories = require("../models/admin/sub_categories")(sequelize, Sequelize);
const Brand = require("../models/admin/brand")(sequelize, Sequelize);
const Unit = require("../models/admin/unit")(sequelize, Sequelize);
const SubUnit = require("../models/admin/sub_unit")(sequelize, Sequelize);
const Size = require("../models/admin/attributes/size")(sequelize, Sequelize);
const Color = require("../models/admin/attributes/color")(sequelize, Sequelize);
const Material = require("../models/admin/attributes/material")(sequelize, Sequelize);
const Product = require("../models/admin/product")(sequelize, Sequelize);
const Attribute = require("../models/admin/attribute")(sequelize, Sequelize);
const ProductGallery = require("../models/admin/product_gallery")(sequelize, Sequelize);
const State = require("../models/state")(sequelize, Sequelize);
const Country = require("../models/country")(sequelize, Sequelize);
const UserAddress = require("../models/user_address")(sequelize, Sequelize);
const Wishlist = require("../models/wishlist")(sequelize, Sequelize);
const Order = require("../models/order")(sequelize, Sequelize);
const OrderDetails = require("../models/order_details")(sequelize, Sequelize);
const Cart = require("../models/cart")(sequelize, Sequelize);

// P.K - F.K. 0. Foreign key vala baad mein i.e Product
Brand.hasMany(Product, {
  foreignKey: "brand_id"
});
Product.belongsTo(Brand, {
  foreignKey: "brand_id",
});

// P.K - F.K. 1. Foreign key vala baad mein i.e Product
MainCategories.hasMany(Product, {
  foreignKey: "main_category_id"
});
Product.belongsTo(MainCategories, {
  foreignKey: "main_category_id",
});

// P.K - F.K. 2
Categories.hasMany(Product, {
  foreignKey: "category_id"
});
Product.belongsTo(Categories, {
  foreignKey: "category_id",
});

// P.K - F.K. 3
SubCategories.hasMany(Product, {
  foreignKey: "sub_category_id",
});
Product.belongsTo(SubCategories, {
  foreignKey: "sub_category_id",
});

// P.K - F.K. 4
User.hasMany(Product, {
  foreignKey: "seller_id",
});
Product.belongsTo(User, {
  foreignKey: "seller_id",
});

// P.K - F.K. 5
MainCategories.hasMany(Categories, {
  foreignKey: "main_category_id",
});
Categories.belongsTo(MainCategories, {
  foreignKey: "main_category_id",
});

// P.K - F.K. 6
Categories.hasMany(SubCategories, {
  foreignKey: "category_id",
});
SubCategories.belongsTo(Categories, {
  foreignKey: "category_id",
});

// P.K - F.K. 7
MainCategories.hasMany(SubCategories, {
  foreignKey: "main_category_id",
});
SubCategories.belongsTo(MainCategories, {
  foreignKey: "main_category_id",
});

// P.K - F.K. 8
Unit.hasMany(Product, {
  foreignKey: "unit_id",
});
Product.belongsTo(Unit, {
  foreignKey: "unit_id",
});

// P.K - F.K. 9
User.hasMany(UserAddress, {
  foreignKey: "user_id",
});
UserAddress.belongsTo(User, {
  foreignKey: "user_id",
});

// P.K - F.K. 10
// User.hasMany(Wishlist, {
//   foreignKey: "user_id",
// });
// Wishlist.belongsTo(User, {
//   foreignKey: "user_id",
// });

// P.K - F.K. 11
// User.hasMany(Order, {
//   foreignKey: "created_by",
// });
// Order.belongsTo(User, {
//   foreignKey: "created_by",
// });

// P.K - F.K. 12
Product.hasMany(Cart, {
  foreignKey: "product_id",
});
Cart.belongsTo(Product, {
  foreignKey: "product_id",
});

db.User = User;
db.Categories = Categories;
db.MainCategories = MainCategories;
db.SubCategories = SubCategories;
db.Brand = Brand;
db.Unit = Unit;
db.SubUnit = SubUnit;
db.Size = Size;
db.Color = Color;
db.Material = Material;
db.Product = Product;
db.Attribute = Attribute;
db.ProductGallery = ProductGallery;
db.State = State;
db.Country = Country;
db.UserAddress = UserAddress;
db.Wishlist = Wishlist;
db.Order = Order;
db.OrderDetails = OrderDetails;
db.Cart = Cart;

module.exports = db;
