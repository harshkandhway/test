const express = require('express')
const {authenticateUser,authorizePermissions} = require('../middleware/authentication.js')
const router = express.Router()
const {
    getAllProducts,
    createProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/products')

router.route('/:id/products/').get(authenticateUser,getAllProducts).post(authenticateUser,authorizePermissions('admin','user'),createProducts)
router.route('/:id/products/:productId/').get(authenticateUser,getProduct).patch(authenticateUser,authorizePermissions('admin','user'),updateProduct).delete(authenticateUser,authorizePermissions('admin','user'),deleteProduct)
router.route('/:id/products/:productId/uploadImage').post(authenticateUser,authorizePermissions('admin','user'),uploadImage)

module.exports = router