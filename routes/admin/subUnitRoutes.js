const express = require('express');
//importing controller
const authGuard = require('../../middleware/authGuard');
const auth = require('../../middleware/auth');

const subUnitController = require('../../controllers/backend/admin/subUnitController');

//express router
const router = express.Router();

//list || render sub-unit ejs file
router.get('/', authGuard, subUnitController.sub_unit_index);

// fetch sub_units from db
router.get('/fetchAllSubUnits', auth, subUnitController.fetchAllSubUnits);

//create form
router.get('/create', authGuard, subUnitController.sub_unit_create_frm );

//save
router.post('/', auth, subUnitController.sub_unit_store);

//show edit form
router.get('/edit/:id', authGuard, subUnitController.sub_unit_edit_frm );

//edit-sub-unit
router.post('/update/:id', auth, subUnitController.sub_unit_edit_update);

//delete
router.delete('/:id', auth, subUnitController.sub_unit_destroy);

//exporting router

module.exports = router; 
