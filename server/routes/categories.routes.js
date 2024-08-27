const express = require('express');
const { fetchCategories, createCategory } = require('../controllers/categories.controllers.js');

const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchCategories).post('/',createCategory)

exports.router = router;