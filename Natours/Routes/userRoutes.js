const express = require('express');
const app = express();
const fs = require('fs');
const userController = require('./../Controllers/userController');
const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.addUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUsers);

module.exports = router;
