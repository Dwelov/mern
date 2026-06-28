const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');


const product = require('../models/inventory');

// Get all products
router.get('/products', inventoryController.getAllProducts);

// Get a single product by ID
router.get('/products/:id', inventoryController.getProductById);

// Create a new product
router.post('/products', inventoryController.createProduct);

// Update a product by ID
router.put('/products/:id', inventoryController.updateProduct);

// Delete a product by ID
router.delete('/products/:id', inventoryController.deleteProduct);

module.exports = router;