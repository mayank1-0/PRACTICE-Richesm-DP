const express = require('express');

//importing controllers
const productController = require('../../controllers/backend/seller/productController');

//express router
const router = express.Router();

// C
router.post('/', productController.product_store);
// R
router.get('/fetchAllProducts', productController.fetchAllProducts);
// U
// router.post('/update/:id', productController.product_edit_update);
// D
// router.delete('/:id', productController.product_destroy);

module.exports = router; 


