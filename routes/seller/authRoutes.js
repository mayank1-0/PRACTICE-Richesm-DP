const { Router } = require('express');
const { sellerSignup, sellerLogin, sellerLogout, fetchAllSellers } = require('../../controllers/backend/seller/authController');
const auth = require('../../middleware/auth');
const router = Router();

// Seller auth
router.post('/seller-registration', sellerSignup);
router.post('/seller-login', sellerLogin);
router.get('/seller-logout', sellerLogout);

router.get('/fetchAllSellers', fetchAllSellers);

module.exports = router;