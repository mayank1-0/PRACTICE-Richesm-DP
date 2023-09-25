const express = require('express');
//express router
const router = express.Router();
const authGuard = require('../../middleware/authGuard');
const { addThumnailImages } = require('../../controllers/backend/admin/addThumnailImg');
const upload = require("../../utils/productThumnailUploader")


//index
router.post('/',upload.single("image"), authGuard, addThumnailImages);

module.exports = router;