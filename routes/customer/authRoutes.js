const { Router } = require('express');
const { customerSignup, customerLogin, customerLogout, customerDetail } = require('../../controllers/backend/customer/authController');
const customerAuth = require('../../middleware/customerAuth');
const router = Router();

// Customer auth
router.post('/registration', customerSignup);
router.post('/user-details', customerAuth, customerDetail);
router.post('/login', customerLogin);
router.get('/logout', customerLogout);

module.exports = router;