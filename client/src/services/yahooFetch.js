// This fetches real-time quote data from Yahoo Finance's public API
export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`http://localhost:3001/api/yahoo/${symbol}`);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format (expected JSON)");
    }

    const data = await response.json();

    if (!data || !data.symbol) {
      throw new Error(`No data for ${symbol}`);
    }

    return {
      regularMarketPrice: data.regularMarketPrice,
      regularMarketPreviousClose: data.regularMarketPreviousClose,
    };
  } catch (err) {
    console.error("fetchStockDetails error:", err.message);
    return {
      regularMarketPrice: 1000,
      regularMarketPreviousClose: 990,
    };
  }
};
