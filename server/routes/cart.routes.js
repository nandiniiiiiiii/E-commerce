const express = require('express');
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controllers/cart.contollers.js');
const cors = require('cors');

const router = express.Router();
//  /products is already added in base path
router.post('/', addToCart)
      .get('/', fetchCartByUser)
      .delete('/:id', deleteFromCart)
      .patch('/:id', updateCart)

exports.router = router;