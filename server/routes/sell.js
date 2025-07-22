const express = require("express");
const router = express.Router();
const UserWithStocks = require("../models/userstocks");
const Trade = require("../models/Trade");

router.post("/", async (req, res) => {
  try {
    const { email, symbol, quantity, price } = req.body;

    console.log("SELL request body:", req.body);

    if (!email || !symbol || quantity == null || price == null) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const qty = Number(quantity);
    const prc = Number(price);

    if (qty <= 0 || prc <= 0) {
      return res.status(400).json({ message: "Quantity and price must be positive." });
    }

     await Trade.create({ email, symbol, quantity: -qty, price: prc, tradeType: "sell" });

     
    const userRecord = await UserWithStocks.findOne({ email });
    if (!userRecord || !Array.isArray(userRecord.stocks)) {
      return res.status(404).json({ message: "User not found or no holdings." });
    }

    const normalize = (s) => s.toUpperCase().replace(".NS", "");
    const index = userRecord.stocks.findIndex(
      (s) => normalize(s.symbol) === normalize(symbol)
    );

    if (index === -1) {
      console.log("All holdings:", userRecord.stocks.map((s) => s.symbol));
      return res.status(400).json({ message: "You don't own this stock." });
    }

    const holding = userRecord.stocks[index];

    if (holding.quantity < qty) {
      return res.status(400).json({ message: "Not enough quantity to sell." });
    }

    holding.quantity -= qty;

    if (holding.quantity <= 0) {
      userRecord.stocks.splice(index, 1);
    }

    await userRecord.save();

    res.status(200).json({ message: "Sell recorded successfully." });
  } catch (err) {
    console.error("Sell error:", err);
    res.status(500).json({ message: "Sell failed.", error: err.message });
  }
});

module.exports = router;
