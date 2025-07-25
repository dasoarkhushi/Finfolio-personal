const express = require("express");
const router = express.Router();
const yahooFinance = require("yahoo-finance2").default;

router.get("/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    if (!symbol) {
      return res.status(400).json({ error: "Symbol is required." });
    }

    const result = await yahooFinance.quote(symbol);

    if (!result || typeof result !== "object" || !result.symbol) {
      console.error("Invalid Yahoo Finance result for:", symbol, result);
      return res.status(500).json({ error: "Invalid quote data from Yahoo Finance" });
    }

    // Optional: Clean result to only return useful fields
    const cleaned = {
      symbol: result.symbol,
      regularMarketPrice: result.regularMarketPrice,
      regularMarketPreviousClose: result.regularMarketPreviousClose,
      regularMarketChange: result.regularMarketChange,
      regularMarketChangePercent: result.regularMarketChangePercent,
      regularMarketOpen: result.regularMarketOpen,
      regularMarketDayHigh: result.regularMarketDayHigh,
      regularMarketDayLow: result.regularMarketDayLow,
      regularMarketTime: result.regularMarketTime,
    };

    res.json(cleaned);
  } catch (err) {
    console.error(`Yahoo Finance fetch error for ${symbol}:`, err.message);
    res.status(500).json({ error: "Failed to fetch stock details" });
  }
});

module.exports = router;