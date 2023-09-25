const express = require('express');
//importing controller
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');
const upload = require("../../utils/addImageSubCategory")



const subCategoryController = require('../../controllers/backend/admin/subCategoryController');

//express router
const router = express.Router();

//list || render category ejs file
router.get('/', authGuard, subCategoryController.sub_category_index);

// fetch categorys from db
router.get('/fetchAllSubCategories', auth, subCategoryController.fetchAllSubCategories);

//create form
router.get('/create', authGuard, subCategoryController.sub_category_create_frm);

//save
router.post('/',upload.single("image"), auth,  subCategoryController.sub_category_store);

//single blog
// router.get('/:id', subCategoryController.sub_category_show );

//show edit form
router.get('/edit/:id', authGuard, subCategoryController.sub_category_edit_frm );

//edit-category
router.post('/update/:id', auth, subCategoryController.sub_category_edit_update);

//delete
router.delete('/:id', auth, subCategoryController.sub_category_destroy);


module.exports = router;
