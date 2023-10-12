const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

//importing controllers
const homePageController = require('../../controllers/backend/homePage/productsController.js');

//express router
const router = express.Router();

//fetch products from db
router.get('/all', homePageController.fetchAllProducts);
router.get('/new-arrival', homePageController.newArrivalProducts);
router.get('/best-seller', homePageController.bestSellerProducts);
router.get('/todays-deal', homePageController.todaysDealProducts);
router.get('/trending', homePageController.trendingProducts);
router.get('/featured', homePageController.featuredProducts);
router.get('/main-categories', homePageController.fetchAllMainCategories);
router.get('/categories', homePageController.fetchAllCategories);
router.get('/sub-categories', homePageController.fetchAllSubCategories);
router.get('/detail/:id', homePageController.productDetail);

// fetch products by brand
router.get('/fetch-single-product-distinct-brands', homePageController.distinctBrandsSingleProduct);
router.get('/fetch-all-product-of-brand/:slug', homePageController.brandsAllProductsFetch);

module.exports = router;
