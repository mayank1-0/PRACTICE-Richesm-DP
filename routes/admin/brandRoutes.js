const express = require('express');
const upload = require("../../utils/addBrandImageUploader")
//importing controller
const authGuard = require('../../middleware/authGuard');
const brandController = require('../../controllers/backend/admin/brandController');
const auth = require('../../middleware/auth');

//express router
const router = express.Router();

//list || render brand ejs file
router.get('/', authGuard, brandController.brand_index);

// fetch brands from db
router.get('/fetchAllBrands', auth, brandController.fetchAllBrands);

//create form
router.get('/create', authGuard, brandController.brand_create_frm );

//save
router.post('/',upload.single("image"), auth, brandController.brand_store);

//show edit form
router.get('/edit/:id', authGuard, brandController.brand_edit_frm );

//edit-brand
router.post('/update/:id',auth, brandController.brand_edit_update);

//delete
router.delete('/:id', auth, brandController.brand_destroy);

//exporting router

module.exports = router; 
