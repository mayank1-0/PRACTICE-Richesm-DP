const express = require('express');
//importing controller
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

const unitController = require('../../controllers/backend/admin/unitController');

//express router
const router = express.Router();

//list || render unit ejs file
router.get('/', authGuard, unitController.unit_index);

// fetch units from db
router.get('/fetchAllUnits', auth, unitController.fetchAllUnits);

//create form
router.get('/create', authGuard, unitController.unit_create_frm);

//save
router.post('/', auth, unitController.unit_store);

//show edit form
router.get('/edit/:id', authGuard, unitController.unit_edit_frm);

//edit-unit
router.post('/update/:id', auth, unitController.unit_edit_update);

//delete
router.delete('/:id', auth, unitController.unit_destroy);

//exporting router

module.exports = router; 
