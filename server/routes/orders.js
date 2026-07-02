const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const ordersFilePath = path.join(__dirname, '../data/orders.json');

const readOrders = () => {
  try {
    const data = fs.readFileSync(ordersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
};

// POST / - Create a new order (protected)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { items, shippingDetails, paymentMethod, totalAmount } = req.body;

    const orderId = 'FS-ORD-' + Math.floor(Math.random() * 900000 + 100000);

    const newOrder = {
      orderId,
      userId: req.user.id,
      items,
      shippingDetails,
      paymentMethod,
      totalAmount,
      date: new Date().toISOString(),
      status: 'Processing',
    };

    const orders = readOrders();
    orders.push(newOrder);
    writeOrders(orders);

    return res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET / - Get current user's orders (protected)
router.get('/', authMiddleware, (req, res) => {
  try {
    const orders = readOrders();
    const userOrders = orders.filter((order) => order.userId === req.user.id);

    return res.json({ success: true, orders: userOrders });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
