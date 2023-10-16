var createError = require('http-errors');
const path = require("path")
const cors = require("cors")
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
var session = require("express-session");
dotenv.config();
const db = require("./dbconfig/connection");
var cookieParser = require('cookie-parser');

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

//customer routes
const customerAuthRoutes = require('./routes/customer/authRoutes');
const customerAddressRoutes = require('./routes/customer/addressRoutes');

//home-page routes
const homePageRoutes = require('./routes/homePage/homePageRoutes');

//salman website route
const UiWebsiteRoutes = require('./routes/website/UiWebsiteRoutes');

//order routes
const orderRoutes = require('./routes/order/orderRoutes');

//cart routes
const cartRoutes = require('./routes/cart/cartRoutes');

const app = express();
app.use(cookieParser());
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

app.listen({ port: process.env.PORT }, (err, address) => {
  if (err) {
    console.log("OOPS, Server Error!");
    console.error(err);
    process.exit(1)
  } else {
    console.log('server listening on ' + process.env.PORT);
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


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// -----------------------------------------------------------------------------------------------

// Admin

//AuthRoutes
app.use(authRoutes);
//AttributeRoutes
app.use('/attribute', attributeRoutes);

//add image uploader for productGallery
app.use('/product-gallery-image', productImageGallery);

//add image uploader for product thumnai
app.use('/product-thumbnail-image', productThumnail);
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

// -------------------------------------------------------------------------------------------------

// Customer

//auth
app.use('/api/customer', customerAuthRoutes);

//address
app.use('/api/customer/address', customerAddressRoutes);

// Home Page

//fetch products
app.use('/api/home-page', homePageRoutes);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });


//salman website route
app.use('/api/website/uidata', UiWebsiteRoutes);

// order route
app.use('/api/order', orderRoutes);

//cart
app.use('/api/cart', cartRoutes);

