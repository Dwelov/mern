/*E-Commerce Inventory Engine
Model products, categories, and suppliers with complex relationships. 
Build aggregations for low-stock alerts, revenue-by-category reports, and fast search with compound indexes. */


// designing the schema for the inventory management system

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    reorderThreshold: {
        type: Number,
        required: true,
        default: 10, // Default threshold for low stock alerts
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
}, { timestamps: true });


// adding the index for the product name and description to enable fast search
productSchema.index({ name: 'text', description: 'text' });
// Corrected Low Stock logic using $expr
productSchema.statics.findLowStock = function () {
    return this.find({
        $expr: { $lt: ["$quantity", "$reorderThreshold"] }
    });
};

// Revenue logic (Needs an Orders collection)
productSchema.statics.revenueByCategory = function () {
    return mongoose.model('Order').aggregate([
        { $unwind: "$items" }, // Deconstruct orders into individual items
        {
            $lookup: {
                from: 'products',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'productInfo'
            }
        },
        { $unwind: "$productInfo" },
        {
            $group: {
                _id: "$productInfo.category",
                totalRevenue: {
                    $sum: { $multiply: ["$items.quantity", "$items.priceAtPurchase"] }
                }
            }
        }
    ]);
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;  