/* 
const express = require("express");
const router = express.Router();
const UserWithStock = require("../models/userstocks");

router.get("/sync/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const trades = await Trade.find({ email });

    if (!trades.length) return res.status(200).json({ message: "No trades found" });

    const stockMap = {};

    
    trades.forEach(({ symbol, quantity, price, tradeType }) => {
      const key = symbol.toUpperCase();

      if (!stockMap[key]) {
        stockMap[key] = { quantity: 0, totalPrice: 0 };
      }

      const signedQty = tradeType === "sell" ? -quantity : quantity;

      stockMap[key].quantity += signedQty;
      stockMap[key].totalPrice += price * signedQty;
    });

    const reconstructedStocks = Object.entries(stockMap)
      .filter(([_, v]) => v.quantity > 0)
      .map(([symbol, data]) => ({
        symbol,
        quantity: data.quantity,
        avgPrice: data.totalPrice / data.quantity,
      }));

    await UserWithStocks.findOneAndUpdate(
      { email },
      { $set: { stocks: reconstructedStocks } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Holdings synced from trade history" });
  } catch (err) {
    console.error("Sync error:", err);
    res.status(500).json({ message: "Failed to sync holdings", error: err.message });
  }
});


module.exports = router;

 */

/* const express = require("express");
const router = express.Router();
const UserWithStock = require("../models/userstocks");


router.get("/:email", async (req, res) => {
  try {
    const user = await UserWithStock.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user.stocks || []);
  } catch (err) {
    console.error("Error fetching user stocks:", err);
    res.status(500).json({ message: "Failed to fetch stocks." });
  }
});

module.exports = router;
 */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const UserWithStock = require("../models/userstocks");

// Utility: Load static symbols from CSV file
const loadCSVStocks = () => {
  const filePath = path.join(__dirname, "..", "public", "us_sample_stocks.csv");
  if (!fs.existsSync(filePath)) return [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.trim().split("\n").slice(1); // skip header
  return lines.map((line) => {
    const [symbol] = line.split(",");
    return {
      symbol: symbol.trim(),
      quantity: 0, // since it's not purchased yet
    };
  });
};

// GET /api/userstocks/:email → fetch user's portfolio + CSV stocks
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const user = await UserWithStock.findOne({ email });
    const dbStocks = user?.stocks || [];

    const csvStocks = loadCSVStocks();

    // Merge + dedupe based on symbol
    const mergedMap = new Map();

    for (const stock of [...csvStocks, ...dbStocks]) {
      mergedMap.set(stock.symbol, stock); // DB stocks override CSV if present
    }

    const mergedStocks = Array.from(mergedMap.values());

    res.status(200).json(mergedStocks);
  } catch (err) {
    console.error("Error fetching user stocks:", err);
    res.status(500).json({ message: "Failed to fetch stocks." });
  }
});

module.exports = router;
