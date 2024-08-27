const express = require('express');
const { createProduct,updateProduct,fetchProductById,fetchAllProducts} = require('../controllers/product.controllers.js');

const router = express.Router();
router
.post('/', createProduct)
.get('/', fetchAllProducts)
.get('/:id', fetchProductById)
.patch('/:id', updateProduct)    

exports.router = router;