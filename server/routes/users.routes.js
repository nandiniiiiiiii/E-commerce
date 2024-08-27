const express = require('express');
const { fetchUserById, updateUser } = require('../controllers/users.controllers.js');

const router = express.Router();
//  /users is already added in base path
router.get('/own', fetchUserById)
      .patch('/:id', updateUser)

exports.router = router;