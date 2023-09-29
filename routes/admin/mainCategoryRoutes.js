const express = require('express');
//importing controller
const mainCategoryController = require('../../controllers/backend/admin/mainCategoryController');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');
const upload = require("../../utils/addMainCategoryImageUploader")

//express router
const router = express.Router();

//list
router.get('/', authGuard, mainCategoryController.main_category_index);

// fetch main-categories from db
router.get('/fetchAllMainCategories', auth, mainCategoryController.fetchAllMainCategories);

//create form
router.get('/create', authGuard, mainCategoryController.main_category_create_frm );

//save
router.post('/',  upload.single("image"), auth, mainCategoryController.main_category_store);

//show edit form
router.get('/edit/:id', authGuard, mainCategoryController.main_category_edit_frm );

//edit
router.put('/update/:id', auth, mainCategoryController.main_category_edit_update);

//delete
router.delete('/:id', auth, mainCategoryController.main_category_destroy);

//exporting router

module.exports = router; 
