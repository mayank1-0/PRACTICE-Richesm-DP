const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

//importing controllers
const websiteController = require('../../controllers/website/UiDataController.js');

//express router
const router = express.Router();
router.get('/fetchallcategories', websiteController.fetchallcategories);
router.get('/fetch-allcategory-by-maincatgeory-slug/:id', websiteController.fetchCategorybyMainCatgeorySlug);
router.get('/fetch-allsubcategory-by-catgeory-slug/:id', websiteController.fetchSubCategorybyainCatgeorySlug);
router.get('/fetch-productlist-bycategory', websiteController.productListByCategoriesSlug);
router.get('/product-detail-by-slug/:id', websiteController.productDetailbyslug);


module.exports = router;
