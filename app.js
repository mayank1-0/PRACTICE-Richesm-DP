var createError = require('http-errors');
const path = require("path")
const cors = require("cors")
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
var session = require("express-session");
dotenv.config();
const db = require("./dbconfig/connection");

// admin routes
const attributeRoutes = require('./routes/admin/attributeRoutes');
const backendRoutes = require('./routes/admin/adminRoutes');
const brandRoutes = require('./routes/admin/brandRoutes');
const authRoutes = require('./routes/admin/authRoutes');
const categoryRoutes = require('./routes/admin/categoryRoutes');
const mainCategoryRoutes = require('./routes/admin/mainCategoryRoutes');
const unitRoutes = require('./routes/admin/unitRoutes');
const subUnitRoutes = require("./routes/admin/subUnitRoutes");
const subCategoryRoutes = require('./routes/admin/subCategoryRoutes');
const sizeRoutes = require('./routes/admin/sizeRoutes');
const colorRoutes = require('./routes/admin/colorRoutes');
const materialRoutes = require('./routes/admin/materialRoutes');
const productRoutes = require('./routes/admin/productRoutes');

// seller routes
const sellerAuthRoutes = require('./routes/seller/authRoutes');
const sellerProductRoutes = require('./routes/seller/productRoutes');
const productImageGallery = require('./routes/admin/productGalleryUpload');
const productThumnail = require('./routes/admin/addthumnailmg');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}))

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "XCR3rsasa%RDHHH",
    cookie: {},
  })
);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("OOPS, Server Error!");
  } else {
    console.log("Server Strated...");
  }
});

app.use("/public", express.static('public'));
app.use("/product", express.static('public/uploads/product'));
app.use("/thumbnailImages", express.static('public/uploads/thumbnailImages'));
app.use(expressLayouts);
app.set('layout', './layouts/backendlayout');
app.set("layout extractScripts", true)
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.set("Cache-Control", "private, no-cache, no-store, must-revalidate"); //means browser will not store data in cache(history) i.e when we press back or forward button in browser, it will not take us to previous page.
  next();
});

db.sequelize.sync();

//AuthRoutes
app.use(authRoutes);
//AttributeRoutes
app.use('/attribute', attributeRoutes);

//add image uploader for productGallery
app.use('/product-gallery-image', productImageGallery);

//add image uploader for product thumnai
app.use('/product-thumnail-image', productThumnail);
//BackendRoutes
app.use('/admin', backendRoutes);
//Brands
app.use('/brand', brandRoutes);
//Unit
app.use('/unit', unitRoutes);
//Main category
app.use('/main-category', mainCategoryRoutes);
//Category
app.use('/category', categoryRoutes);
//Sub unit
app.use('/sub-unit', subUnitRoutes);
//Sub Category
app.use('/sub-category', subCategoryRoutes);
//Size
app.use('/size', sizeRoutes);
//Color
app.use('/color', colorRoutes);
//Material
app.use('/material', materialRoutes);
//Product
app.use('/product', productRoutes);

// ------------------------------------------------------------------------------------------------

//Seller

//auth
app.use('/api/seller/auth', sellerAuthRoutes);
//product
app.use('/api/seller/product', sellerProductRoutes);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });