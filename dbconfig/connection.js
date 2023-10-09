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

// For Admin
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

module.exports = db;
