const { Router } = require('express');
const { addAddressDetails, updateAddressDetails, deleteAddressDetails, fetchAllUserAddresses } = require('../../controllers/backend/customer/addressController');
// const customerAuth = require('../../middleware/customerAuth');
const router = Router();

router.post('/create-address-details', addAddressDetails);
router.put('/update-address-details/:id', updateAddressDetails);
router.delete('/delete-address-details/:id', deleteAddressDetails);
router.get('/fetch-all-addresses', fetchAllUserAddresses);

module.exports = router;