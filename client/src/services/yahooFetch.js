// This fetches real-time quote data from Yahoo Finance's public API
export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`/api/yahoo/${symbol}`)


    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format (expected JSON)");
    }

    const data = await response.json();

    if (!data || !data.symbol) {
      throw new Error(`No data for ${symbol}`);
    }

    return {
      symbol: data.symbol,
      marketState: data.marketState || "UNKNOWN",
      regularMarketPrice: data.regularMarketPrice,
      regularMarketPreviousClose: data.regularMarketPreviousClose,
      regularMarketChange: data.regularMarketChange,
    };
  } catch (err) {
    console.error("fetchStockDetails error:", err.message);
    return {
      regularMarketPrice: 1000,
      regularMarketPreviousClose: 990,
    };
  }
};
