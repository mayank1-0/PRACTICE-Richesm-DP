const express = require('express');
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

//importing controller
const materialController = require('../../controllers/backend/admin/materialController');

//express router
const router = express.Router();

//list || render material ejs file
router.get('/', authGuard, materialController.material_index);

// fetch materials from db
router.get('/fetchAllMaterials', auth, materialController.fetchAllMaterials);

//create form
router.get('/create', authGuard, materialController.material_create_frm );

//save
router.post('/', auth, materialController.material_store);

//single blog
// router.get('/:id', materialController.material_show );

//show edit form
router.get('/edit/:id', authGuard, materialController.material_edit_frm );

//edit-material
router.post('/update/:id', auth, materialController.material_edit_update);

//delete
router.delete('/:id', auth, materialController.material_destroy);

//exporting router

module.exports = router; 
