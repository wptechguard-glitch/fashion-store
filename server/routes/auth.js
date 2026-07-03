const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/auth");

const JWT_SECRET = "fashionstore_jwt_secret_2024";
const usersFilePath = path.join(__dirname, "../data/users.json");

// Helper to read users
const readUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

// Helper to write users
const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
};

// Register User
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    const users = readUsers();
    const userExists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (userExists) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: fullName,
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter both email and password" });
    }

    const users = readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// Get User Profile (Protected)
router.get("/profile", auth, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Get Profile error:", error);
    res.status(500).json({ success: false, message: "Server error fetching profile" });
  }
});

// Update User Profile (Protected)
router.put("/profile", auth, (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (fullName) users[userIndex].name = fullName;
    if (phone !== undefined) users[userIndex].phone = phone;

    writeUsers(users);

    res.json({
      success: true,
      user: {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        phone: users[userIndex].phone,
      },
    });
  } catch (error) {
    console.error("Update Profile error:", error);
    res.status(500).json({ success: false, message: "Server error updating profile" });
  }
});

module.exports = router;
