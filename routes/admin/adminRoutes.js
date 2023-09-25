const express = require('express');
//express router
const router = express.Router();
const authGuard = require('../../middleware/authGuard');

const { dashboard } = require('../../controllers/backend/admin/adminController');

//index
router.get('/dashboard', authGuard, dashboard);

module.exports = router;