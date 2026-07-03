const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Fashion Store API Running" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
