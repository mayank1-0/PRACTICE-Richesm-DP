const { Router } = require('express');
const { signup_get, login_get, signup_post, initializeAdmin, adminLogin, login_post, adminLogout } = require('../../controllers/auth/authController');
const isLoggedIn = require('../../middleware/isLoggedIn')
const router = Router();

// router.get('/signup', signup_get);
// router.post('/signup', signup_post);
router.post('/initialize-admin', initializeAdmin);
router.post('/admin-login', adminLogin);
router.get('/admin-logout', adminLogout);

router.get('/', isLoggedIn, login_get);

module.exports = router;