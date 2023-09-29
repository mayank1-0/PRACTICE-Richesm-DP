const express = require('express');

//importing controller
const attributeController = require('../../controllers/backend/admin/attributeController');

//express router
const router = express.Router();

// fetch attributes from db
router.get('/fetchAllAttributes', attributeController.fetchAllAttributes);

//initialize attributes i.e adding size and material in database
router.post('/', attributeController.attribute_store);

//exporting router

module.exports = router; 
