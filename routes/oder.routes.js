const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const auth = require('../middleware/auth');

// POST — order place karo
router.post('/place', auth, async (req, res) => {
    try {
        const { restaurantId, deliveryAddress } = req.body;
        const userId = req.user.id;

        // cart dekho
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart empty hai' });
        }

        // order banao
        const order = await Order.create({
            userId,
            restaurantId,
            items: cart.items,
            totalAmount: cart.totalPrice,
            deliveryAddress,
            status: 'pending'
        });

        // cart clear karo
        await Cart.findOneAndDelete({ userId });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET — mere saare orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET — ek order detail
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT — status update karo
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;