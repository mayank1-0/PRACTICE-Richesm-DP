const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

//importing controller
const sizeController = require('../../controllers/backend/admin/sizeController');

//express router
const router = express.Router();

//list || render size ejs file
router.get('/', authGuard, sizeController.size_index);

// fetch sizes from db
router.get('/fetchAllSizes', auth, sizeController.fetchAllSizes);

//create form
router.get('/create', authGuard, sizeController.size_create_frm );

//save
router.post('/', auth, sizeController.size_store);

//single blog
// router.get('/:id', sizeController.size_show );

//show edit form
router.get('/edit/:id', authGuard, sizeController.size_edit_frm );

//edit-size
router.post('/update/:id', auth, sizeController.size_edit_update);

//delete
router.delete('/:id', auth, sizeController.size_destroy);

//exporting router

module.exports = router; 
