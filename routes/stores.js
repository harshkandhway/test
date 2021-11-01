const express = require('express')
const {authenticateUser,authorizePermissions} = require('../middleware/authentication.js')
const router = express.Router()
const {
    getAllStores,
    getAllRequestedStores,
    createStores,
    getStore,
    updateStore,
    deleteStore,
    uploadImage,
} = require('../controllers/stores')

router.route('/').get(getAllStores).post(authenticateUser,createStores)
router.route('/requests').get(authenticateUser,getAllRequestedStores)
router.route('/:id').get(authenticateUser,getStore).patch(authenticateUser, authorizePermissions('admin'),updateStore).delete(authenticateUser, authorizePermissions('admin'),deleteStore)
router.route('/:id/uploadImage').post(authenticateUser, authorizePermissions('admin'),uploadImage)



module.exports = router