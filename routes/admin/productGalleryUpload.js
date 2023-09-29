const express = require('express');
//express router
const router = express.Router();
const auth = require('../../middleware/auth');
const { addImages } = require('../../controllers/backend/admin/productImagesGallery');
const upload = require("../../utils/addProductGalleryImage")


//index
router.post('/',upload.array("images",10), auth, addImages);

module.exports = router;