const express = require('express');
//importing controller
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');
const upload= require("../../utils/addcategoryImageUploader")

const categoryController = require('../../controllers/backend/admin/categoryController');

//express router
const router = express.Router();

//list
router.get('/', authGuard, categoryController.category_index);

// fetch main-categories from db
router.get('/fetchAllCategories', auth, categoryController.fetchAllCategories);

//create form
router.get('/create', authGuard, categoryController.category_create_frm );

//save
router.post('/',upload.single("image"), auth,  categoryController.category_store);

//
router.post('/update/:id', auth, categoryController.category_edit_update);

//show edit form
router.get('/edit/:id', authGuard, categoryController.category_edit_frm );


//delete
router.delete('/:id', auth, categoryController.category_destroy);

// upload file
router.post(
    "/uploadFile",
    upload.single("myFile"), auth,
    categoryController.uploadFile
  );

//exporting router

module.exports = router; 
