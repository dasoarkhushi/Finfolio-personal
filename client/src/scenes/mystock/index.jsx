
// /client/src/pages/StockListPage.jsx


/* import React, { useEffect, useState, useCallback } from "react";
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

const StockListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadStocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/userstocks/${user.email}`);
      const userStocks = await res.json();

      const defaultSymbols = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS"];
      const userSymbols = userStocks.map((s) =>
        s.symbol.includes(".") ? s.symbol : `${s.symbol}.NS`
      );
      const mergedSymbols = Array.from(new Set([...defaultSymbols, ...userSymbols]));

      const results = await Promise.all(
        mergedSymbols.map(async (symbol) => {
          const quote = await fetchStockDetails(symbol);
          if (!quote) return null;

          const matched = userStocks.find((s) => s.symbol === symbol || `${s.symbol}.NS` === symbol);
          return {
            ...quote,
            quantity: matched ? matched.quantity : 10,
          };
        })
      );

      setStocks(results.filter(Boolean));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error loading stock list:", error);
    }
    setLoading(false);
  }, [user.email]);

  useEffect(() => {
    loadStocks();
    const interval = setInterval(loadStocks, 30000);

    const syncHandler = (e) => {
      if (e.key === "portfolio-updated") {
        setReloadKey((prev) => prev + 1);
      }
    };
    window.addEventListener("storage", syncHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncHandler);
    };
  }, [loadStocks]);

  useEffect(() => {
    loadStocks();
  }, [reloadKey, loadStocks]);

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
              <Box
                component="table"
                width="100%"
                sx={{ fontSize: 14, borderCollapse: "collapse", mt: 2 }}
              >
                <thead>
                  <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                    <th>Symbol</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Change%</th>
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
                        <td>{stock.symbol}</td>
                        <td>{stock.quantity || "-"}</td>
                        <td>₹{stock.regularMarketPrice?.toFixed(2) || "-"}</td>
                        <td style={{ color: isPositive ? colors.greenAccent[500] : colors.redAccent[500] }}>
                          {isPositive ? "+" : ""}
                          {stock.regularMarketChangePercent?.toFixed(2) || "0.00"}%
                        </td>
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
 */

import React, { useEffect, useState, useCallback } from "react";
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

const StockListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadStocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/userstocks/${user.email}`);
      const userStocks = await res.json();

      if (!Array.isArray(userStocks) || userStocks.length === 0) {
        setStocks([]);
        setLoading(false);
        return;
      }

      const userSymbols = userStocks.map((s) =>
        s.symbol.includes(".") ? s.symbol : `${s.symbol}.NS`
      );

      const results = await Promise.all(
        userSymbols.map(async (symbol) => {
          const quote = await fetchStockDetails(symbol);
          if (!quote) return null;

          const matched = userStocks.find(
            (s) => s.symbol === symbol || `${s.symbol}.NS` === symbol
          );
          return {
            ...quote,
            quantity: matched ? matched.quantity : "-",
          };
        })
      );

      setStocks(results.filter(Boolean));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error loading stock list:", error);
    }
    setLoading(false);
  }, [user.email]);

  useEffect(() => {
    loadStocks();
    const interval = setInterval(loadStocks, 30000);

    const syncHandler = (e) => {
      if (e.key === "portfolio-updated") {
        setReloadKey((prev) => prev + 1);
      }
    };
    window.addEventListener("storage", syncHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncHandler);
    };
  }, [loadStocks]);

  useEffect(() => {
    loadStocks();
  }, [reloadKey, loadStocks]);

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
            ) : stocks.length === 0 ? (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                textAlign="center"
                mt="40px"
              >
                No stocks present. Please purchase a stock to view holdings.
              </Typography>
            ) : (
              <Box
                component="table"
                width="100%"
                sx={{ fontSize: 14, borderCollapse: "collapse", mt: 2 }}
              >
                <thead>
                  <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                    <th>Symbol</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Change%</th>
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
                        <td>{stock.symbol}</td>
                        <td>{stock.quantity || "-"}</td>
                        <td>₹{stock.regularMarketPrice?.toFixed(2) || "-"}</td>
                        <td style={{ color: isPositive ? colors.greenAccent[500] : colors.redAccent[500] }}>
                          {isPositive ? "+" : ""}
                          {stock.regularMarketChangePercent?.toFixed(2) || "0.00"}%
                        </td>
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
