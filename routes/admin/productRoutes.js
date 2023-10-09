const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');
const upload = require("../../utils/addcategoryImageUploader")

//importing controlleras
const productController = require('../../controllers/backend/admin/productController');

//express router
const router = express.Router();

//list || render product ejs file
router.get('/', authGuard, productController.product_index);

// fetch products from db
router.get('/fetchAllProducts', auth, productController.fetchAllProducts);

//create form
router.get('/create', authGuard, productController.product_create_frm);

//save
router.post('/', upload.single("image"), auth, productController.product_store);

//show edit form
router.get('/edit/:id', authGuard, productController.product_edit_frm);

// fetch single product details
router.get('/fetchProduct/:id', auth, productController.fetchProductDetailsById);

//edit-product
router.post('/update/:id', auth, productController.product_edit_update);

//delete
router.delete('/:id', auth, productController.product_destroy);

//exporting router

module.exports = router; 
