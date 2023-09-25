const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

//importing controller
const colorController = require('../../controllers/backend/admin/colorController');

//express router
const router = express.Router();

//list || render color ejs file
router.get('/', authGuard, colorController.color_index);

// fetch colors from db
router.get('/fetchAllColors', auth, colorController.fetchAllColors);

//create form
router.get('/create', authGuard, colorController.color_create_frm );

//save
router.post('/', auth, colorController.color_store);

//single blog
// router.get('/:id', colorController.color_show );

//show edit form
router.get('/edit/:id', authGuard, colorController.color_edit_frm );

//edit-color
router.post('/update/:id', auth, colorController.color_edit_update);

//delete
router.delete('/:id', auth, colorController.color_destroy);

//exporting router

module.exports = router; 
