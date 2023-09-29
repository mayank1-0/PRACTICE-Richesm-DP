const express = require('express');
const auth = require('../../middleware/auth');

//importing controller
const attributeController = require('../../controllers/backend/admin/attributeController');

//express router
const router = express.Router();

// fetch attributes from db
router.get('/fetchAllAttributes', auth, attributeController.fetchAllAttributes);

//initialize attributes i.e adding Size and Material in database
router.post('/', attributeController.attribute_store);

//exporting router

module.exports = router; 
