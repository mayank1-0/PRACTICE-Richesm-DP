const { Router } = require('express');
const { cartCustomerDetails  } = require('../../controllers/backend/customer/cartController.js');
// middleware for cart's-customer

const router = Router();

// Cart's customer details

router.get('/cart-customer-details-fetch', cartCustomerDetails);

module.exports = router;