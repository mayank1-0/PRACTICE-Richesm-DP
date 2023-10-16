const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

//importing controllers
const cartController = require('../../controllers/backend/cart/cartController.js');

//express router
const router = express.Router();

// create
router.post('/create', auth, cartController.cart_store);

// delete
router.delete('/delete/:id', auth, cartController.cart_destroy);

// read
router.get('/fetchAll', auth, cartController.fetchAllCarts);

// update
router.post('/edit/:id', auth, cartController.cart_edit_update);

module.exports = router;
