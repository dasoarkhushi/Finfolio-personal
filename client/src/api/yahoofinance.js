// server.js
/* import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/stocks', async (req, res) => {
  const symbols = req.query.symbols;
  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Yahoo data" });
  }
});

app.listen(PORT, () => {
  console.log(` Backend proxy running at http://localhost:${PORT}`);
});

 */

// src/api/finnhub.js

// src/api/yahoofinance.js

/**
 * Fetches stock data for a given symbol from the backend API.
 * Returns the raw Yahoo Finance quote object including fields like:
 * - regularMarketPrice
 * - regularMarketChangePercent
 * - regularMarketOpen
 * - regularMarketPreviousClose
 * - etc.
 */

/* export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log(" Raw Yahoo data for", symbol, "→", data);

    return data; // Return full quote object for JSX to consume directly
  } catch (error) {
    console.error(` Error fetching ${symbol}:`, error.message);
    return null;
  }
};
 */

//  This should be in frontend file: src/api/yahoofinance.js
 
// /client/src/api/yahoofinance.js
/* export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`/api/yahoo/${symbol}`);
    

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format (expected JSON)");
    }

    const data = await response.json();
    return data?.quoteResponse?.result?.[0] || data;
  } catch (err) {
    console.error("fetchStockDetails error:", err.message);
    return null;
  }
}; */

/* 
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}/api/stocks/${symbol}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchStockDetails error:", err.message);
    return null;
  }
};
 */

export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`/api/yahoo/${symbol}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const rawText = await response.text(); // Read raw response for debugging
      console.error(`Non-JSON response for ${symbol}:`, rawText);
      throw new Error("Invalid response format (expected JSON)");
    }

    const data = await response.json();

    // Handle either direct YahooFinance or wrapped proxy structure
    const stock = data?.quoteResponse?.result?.[0] || data;

    if (!stock || !stock.symbol) {
      throw new Error(`No stock data found for ${symbol}`);
    }

    return stock;
  } catch (err) {
    console.error(`fetchStockDetails error for ${symbol}:`, err.message);
    return null;
  }
};
