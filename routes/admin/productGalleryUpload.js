const express = require('express');
//express router
const router = express.Router();
const authGuard = require('../../middleware/authGuard');
const { addImages } = require('../../controllers/backend/admin/productImagesGallery');
const upload = require("../../utils/addProductGalleryImage")


//index
router.post('/',upload.array("images",10), authGuard, addImages);

module.exports = router;