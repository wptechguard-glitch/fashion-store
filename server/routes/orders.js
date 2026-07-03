const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/auth");

const ordersFilePath = path.join(__dirname, "../data/orders.json");

// Helper to read orders
const readOrders = () => {
  try {
    if (!fs.existsSync(ordersFilePath)) {
      fs.writeFileSync(ordersFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(ordersFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading orders file:", error);
    return [];
  }
};

// Helper to write orders
const writeOrders = (orders) => {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
  } catch (error) {
    console.error("Error writing orders file:", error);
  }
};

// Create Order
router.post("/", auth, (req, res) => {
  try {
    const { items, shippingDetails, paymentMethod, totalAmount } = req.body;

    if (!items || items.length === 0 || !shippingDetails || !paymentMethod || !totalAmount) {
      return res.status(400).json({ success: false, message: "Missing order details" });
    }

    const orders = readOrders();
    const orderId = `FS-ORD-${Math.floor(Math.random() * 900000 + 100000)}`;

    const newOrder = {
      orderId,
      userId: req.user.id,
      items,
      shippingDetails,
      paymentMethod,
      totalAmount,
      status: "Processing",
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    orders.push(newOrder);
    writeOrders(orders);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: "Server error creating order" });
  }
});

// Get User's Orders
router.get("/", auth, (req, res) => {
  try {
    const orders = readOrders();
    const userOrders = orders.filter((o) => o.userId === req.user.id);
    res.json(userOrders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ success: false, message: "Server error fetching orders" });
  }
});

module.exports = router;
