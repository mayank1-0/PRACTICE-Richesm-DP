const express = require('express');

//importing controller
const attributeController = require('../../controllers/backend/admin/attributeController');

//express router
const router = express.Router();

//list || render attribute ejs file
router.get('/', attributeController.attribute_index);

// fetch attributes from db
router.get('/fetchAllAttributes', attributeController.fetchAllAttributes);

//create form
router.get('/create', attributeController.attribute_create_frm );

//save
router.post('/', attributeController.attribute_store);

//show edit form
router.get('/edit/:id', attributeController.attribute_edit_frm );

//edit-attribute
router.post('/update/:id',attributeController.attribute_edit_update);

//delete
router.delete('/ :id', attributeController.attribute_destroy);

//exporting router

module.exports = router; 
