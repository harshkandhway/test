const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermissions} = require('../middleware/authentication.js')

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  // updateUserPassword,
} = require('../controllers/user');

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser/:userID').patch(authenticateUser, updateUser);
// router.route('/updateUserPassword').patch(/*authenticateUser,*/ updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
