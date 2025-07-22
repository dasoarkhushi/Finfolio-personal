const express = require("express");
const router = express.Router();
const Trade = require("../models/Trade");

router.get("/:email", async (req, res) => {
  try {
    const trades = await Trade.find({ email: req.params.email }).sort({ tradeTime: -1 });
    res.json(trades);
  } catch (err) {
    console.error("Trade fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch trades" });
  }
});

module.exports = router;
