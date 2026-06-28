const product = require('../models/inventory');
const order = require('../models/order');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try { 
        const products = await product.findById(req.params.id);
        if (!products) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const newProduct = new product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
