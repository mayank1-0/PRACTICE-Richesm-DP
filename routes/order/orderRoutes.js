const express = require('express');

//importing controller
const authGuard = require('../../middleware/authGuard');
const orderController = require('../../controllers/backend/order/orderController');
const auth = require('../../middleware/auth');

//express router
const router = express.Router();

//list || render order ejs file
router.get('/', authGuard, orderController.order_index);

// fetch orders from db
router.get('/fetchAllOrders', auth, orderController.fetchAllOrders);

//create form
// router.get('/create', authGuard, orderController.brand_create_frm );

//save
router.post('/', auth, orderController.order_store);

//show edit form
// router.get('/edit/:id', authGuard, orderController.brand_edit_frm );

//edit-order
router.post('/update/:id', auth, orderController.order_edit_update);

//delete
router.delete('/:id', auth, orderController.order_destroy);

//exporting router

module.exports = router; 
