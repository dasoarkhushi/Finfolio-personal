/* const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Stocks = require("../models/Stocks");
const UserWithStocks = require("../models/userstocks");

const JWT_SECRET = process.env.JWT_SECRET || "finfolio-secret";


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ message: "User registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });

    let stocks = await Stocks.find({ email });

    if (stocks.length === 0) {
      const defaultStocks = [
        {
          email,
          symbol: "TCS",
          quantity: 10,
          price: 1000,
          time: new Date().toISOString()
        },
        {
          email,
          symbol: "HDFCBANK",
          quantity: 5,
          price: 1400,
          time: new Date().toISOString()
        },
        {
          email,
          symbol: "RELIANCE",
          quantity: 3,
          price: 2200,
          time: new Date().toISOString()
        }
      ];

      await Stocks.insertMany(defaultStocks);
      stocks = defaultStocks;
    }

    const formattedStocks = stocks.map(stock => ({
      symbol: stock.symbol,
      quantity: stock.quantity
    }));


    const existing = await UserWithStocks.findOne({ email });

    if (existing) {
      existing.stocks = formattedStocks;
      await existing.save();
    } else {
      await UserWithStocks.create({
        name: user.name,
        email: user.email,
        stocks: formattedStocks
      });
    }

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email
      },
      message: "Login successful and default stocks synced"
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Stocks = require("../models/Stocks");
const UserWithStocks = require("../models/userstocks");

const JWT_SECRET = process.env.JWT_SECRET || "finfolio-secret";


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ===================== LOGIN =====================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    // ✅ Fetch only actual user stocks (don't insert defaults)
    const stocks = await Stocks.find({ email });

    const formattedStocks = stocks.map((stock) => ({
      symbol: stock.symbol,
      quantity: stock.quantity,
    }));

    // ✅ Sync to userWithStocks collection
    const existingUserStocks = await UserWithStocks.findOne({ email });

    if (existingUserStocks) {
      existingUserStocks.stocks = formattedStocks;
      await existingUserStocks.save();
    } else {
      await UserWithStocks.create({
        name: user.name,
        email: user.email,
        stocks: formattedStocks,
      });
    }

    // ✅ Send login success
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;