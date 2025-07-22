const express = require("express");
const router = express.Router();
const UserWithStocks = require("../models/userstocks");
const Trade = require("../models/Trade");

router.post("/", async (req, res) => {
  const { email, symbol, quantity, price } = req.body;

  try {
    const qty = Number(quantity); // Ensure quantity is a number

    // 1. Record the trade (FIXED: Added tradeType here)
    await Trade.create({
      email,
      symbol,
      quantity: qty,
      price,
      tradeType: "buy" // ✅ This line fixes the issue!
    });

    // 2. Find user by email
    let userRecord = await UserWithStocks.findOne({ email });

    // If user doesn't exist, create with this stock
    if (!userRecord) {
      userRecord = await UserWithStocks.create({
        email,
        stocks: qty > 0 ? [{ symbol, quantity: qty }] : [],
      });
    } else {
      // Ensure stocks array exists
      if (!Array.isArray(userRecord.stocks)) {
        userRecord.stocks = [];
      }

      const index = userRecord.stocks.findIndex((s) => s.symbol === symbol);

      if (index !== -1) {
        userRecord.stocks[index].quantity += qty;

        if (userRecord.stocks[index].quantity <= 0) {
          userRecord.stocks.splice(index, 1); // Remove if zero
        }
      } else {
        if (qty > 0) {
          userRecord.stocks.push({ symbol, quantity: qty });
        }
      }

      await userRecord.save();
    }

    res.status(200).json({ message: "Purchase recorded successfully." });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: "Purchase failed.", error: err.message });
  }
});

module.exports = router;
