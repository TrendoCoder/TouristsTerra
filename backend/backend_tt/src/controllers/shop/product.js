// ProductController.js

const Product = require('../../models/shop/products');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            ratings: req.body.ratings,
            category: req.body.category,
            seller: req.body.seller,
            inStock: req.body.inStock
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category').populate('seller');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category').populate('seller');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        // Extract query string
        const { q } = req.query;
        // Build a 'find' query with a case-insensitive regex search
        const searchQuery = q ? { name: new RegExp(q, 'i') } : {};

        // Execute the query and return the results
        const products = await Product.find(searchQuery).populate('category').populate('seller');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        let queryObject = {};

        // Filter by exact price
        if (req.query.price) {
            queryObject.price = parseFloat(req.query.price);
        }

        // Filter by exact quantity
        if (req.query.quantity) {
            queryObject.quantity = parseInt(req.query.quantity);
        }

        // Filter by stock availability
        if (req.query.inStock) {
            queryObject.inStock = req.query.inStock === 'true';
        }

        // Filter by exact rating
        if (req.query.rating) {
            queryObject.ratings = parseFloat(req.query.rating);
        }

        // You can keep the sorting logic if it is required
        let sort = {};
        if (req.query.sort) {
            const sortFields = req.query.sort.split(',');
            sortFields.forEach(field => {
                const [key, order] = field.startsWith('-') ? [field.substring(1), -1] : [field, 1];
                sort[key] = order;
            });
        }

        const products = await Product.find(queryObject)
            .populate('category')
            .sort(sort); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
