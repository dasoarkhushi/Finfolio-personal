
// /client/src/pages/StockListPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  CircularProgress,
  Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchStockDetails } from "../../api/yahoofinance";

const symbols = ["AAPL", "MSFT", "GOOGL", "TCS.NS", "INFY.NS", "SBIN.NS"];

const StockListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      const results = await Promise.all(symbols.map(fetchStockDetails));
      setStocks(results.filter(Boolean));
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    };

    loadStocks();
    const interval = setInterval(loadStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      <Header title="STOCK LIST" subtitle="My Portfolio Holdings" />

      <Box mt="20px">
        <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="600" color={colors.greenAccent[400]}>
                Live Stock Snapshot
              </Typography>
              {lastUpdated && (
                <Chip
                  label={`Last updated: ${lastUpdated}`}
                  sx={{ backgroundColor: colors.blueAccent[700], color: "white" }}
                />
              )}
            </Box>

            {loading ? (
              <CircularProgress sx={{ mt: 4, color: colors.greenAccent[400] }} />
            ) : (
              <Box component="table" width="100%" sx={{ fontSize: 14, borderCollapse: "collapse", mt: 2 }}>
                <thead>
                  <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Change%</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Prev. Close</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, index) => {
                    if (!stock || !stock.symbol) return null;
                    const isPositive = (stock.regularMarketChange || 0) >= 0;
                    return (
                      <tr
                        key={stock.symbol || index}
                        style={{
                          borderBottom: `1px solid ${colors.primary[500]}`,
                          color: colors.grey[100],
                          height: "40px",
                        }}
                      >
                        <td>{(stock.symbol || "").replace(".BSE", "")}</td>
                        <td>₹{stock.regularMarketPrice?.toFixed(2) || "-"}</td>
                        <td
                          style={{
                            color: isPositive ? colors.greenAccent[500] : colors.redAccent[500],
                          }}
                        >
                          {isPositive ? "+" : ""}
                          {stock.regularMarketChangePercent?.toFixed(2) || "0.00"}%
                        </td>
                        <td>₹{stock.regularMarketOpen?.toFixed(2) || "-"}</td>
                        <td>₹{stock.regularMarketDayHigh?.toFixed(2) || "-"}</td>
                        <td>₹{stock.regularMarketDayLow?.toFixed(2) || "-"}</td>
                        <td>₹{stock.regularMarketPreviousClose?.toFixed(2) || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default StockListPage;
