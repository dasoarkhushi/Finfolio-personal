/* import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
];

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  const handleBuy = async () => {
    try {
      
      const { data } = await axios.get(`/api/quote?symbol=${symbol}`);
      const price = data.latestPrice;

      await axios.post("/api/purchase", {
        email,
        symbol,
        quantity: Number(quantity),
        price: Number(price),
      });

      setAlert({ open: true, msg: "Purchase successful!", severity: "success" });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({ open: true, msg: "Purchase failed", severity: "error" });
    }
  };

  return (
    <Box m="20px">
      <Header title="PURCHASE STOCKS" subtitle="Buy equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            color={colors.greenAccent[400]}
          >
            Place Order
          </Typography>

       
          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {symbols.map((sym) => (
                <MenuItem
                  key={sym}
                  value={sym}
                  sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: colors.greenAccent[700],
                      color: "#ffffff",
                    },
                  }}
                >
                  {sym}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

       
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleBuy}
            disabled={!symbol || !quantity}
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: colors.greenAccent[600],
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Buy Now
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;
 */

/* import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
]; 




const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  const handleTransaction = async (type) => {
    try {
      const userEmail = email || JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail || !symbol || !quantity) {
        throw new Error("Missing required fields.");
      }

      const quoteRes = await fetch(`/api/quote?symbol=${symbol}`);
      const quoteData = await quoteRes.json();

      const price =
        quoteData?.regularMarketPrice ??
        quoteData?.ask ??
        quoteData?.previousClose;

      if (!price || price <= 0) {
        throw new Error("Invalid price data from Yahoo Finance.");
      }

      const res = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          symbol,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${type} failed: ${errText}`);
      }

      localStorage.setItem("portfolio-updated", new Date().toISOString());

      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} successful!`,
        severity: "success",
      });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} failed. ${err.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="TRADE STOCKS" subtitle="Buy or sell equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            color={colors.greenAccent[400]}
          >
            Place Order
          </Typography>

          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {[...symbols].sort().map((sym) => (
                <MenuItem
                  key={sym}
                  value={sym}
                  sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: colors.greenAccent[700],
                      color: "#ffffff",
                    },
                  }}
                >
                  {sym}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

       
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("purchase")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Buy
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                },
              }}
            >
              Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;

 */




/*
last working code 
 import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stockOptions, setStockOptions] = useState([]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  
  useEffect(() => {
    fetch("/us_sample_stocks.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.trim().split("\n").slice(1); // remove header
        const options = lines.map((line) => {
          const [symbol] = line.split(",");
          return {
            label: symbol.trim(),
            value: symbol.trim(),
          };
        });
        setStockOptions(options);
      })
      .catch((err) => console.error("Error loading stock list:", err));
  }, []);

  const handleTransaction = async (type) => {
    try {
      const userEmail = email || JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail || !symbol || !quantity) {
        throw new Error("Missing required fields.");
      }

      const quoteRes = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);
      const quoteData = await quoteRes.json();

      const price =
        quoteData?.regularMarketPrice ?? quoteData?.ask ?? quoteData?.previousClose;

      if (!price || price <= 0) {
        throw new Error("Invalid price data from Yahoo Finance.");
      }

      const res = await fetch(`http://localhost:3001/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          symbol,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${type} failed: ${errText}`);
      }

      localStorage.setItem("portfolio-updated", new Date().toISOString());
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} successful!`,
        severity: "success",
      });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} failed. ${err.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="TRADE STOCKS" subtitle="Buy or sell equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="600" gutterBottom color={colors.greenAccent[400]}>
            Place Order
          </Typography>

        
          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {stockOptions.length === 0 ? (
                <MenuItem disabled>No stocks available</MenuItem>
              ) : (
                [...stockOptions]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("purchase")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Buy
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage; */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// 🔁 Hardcoded constant symbols
const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
];

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stockOptions, setStockOptions] = useState([]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  // ✅ Combine constants, backend, and CSV
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    const backendFetch = fetch(`http://localhost:3001/api/userstocks/${user.email}`)
      .then((res) => res.json())
      .then((data) =>
        data.map((stock) => ({
          label: stock.symbol,
          value: stock.symbol,
        }))
      )
      .catch((err) => {
        console.error("Backend fetch error:", err);
        return [];
      });

    const csvFetch = fetch("/us_sample_stocks.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.trim().split("\n").slice(1);
        return lines.map((line) => {
          const [symbol] = line.split(",");
          return {
            label: symbol.trim(),
            value: symbol.trim(),
          };
        });
      })
      .catch((err) => {
        console.error("CSV fetch error:", err);
        return [];
      });

    const constantSymbols = symbols.map((s) => ({ label: s, value: s }));

    Promise.all([backendFetch, csvFetch]).then(([backend, csv]) => {
      const merged = [...backend, ...csv, ...constantSymbols];
      const deduped = Array.from(new Map(merged.map((s) => [s.value, s])).values());
      setStockOptions(deduped);
    });
  }, []);

  const handleTransaction = async (type) => {
    try {
      const userEmail = email || JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail || !symbol || !quantity) {
        throw new Error("Missing required fields.");
      }

      const quoteRes = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);
      const quoteData = await quoteRes.json();

      const price =
        quoteData?.regularMarketPrice ?? quoteData?.ask ?? quoteData?.previousClose;

      if (!price || price <= 0) {
        throw new Error("Invalid price data from Yahoo Finance.");
      }

      const res = await fetch(`http://localhost:3001/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          symbol,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${type} failed: ${errText}`);
      }

      localStorage.setItem("portfolio-updated", new Date().toISOString());
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} successful!`,
        severity: "success",
      });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} failed. ${err.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="TRADE STOCKS" subtitle="Buy or sell equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="600" gutterBottom color={colors.greenAccent[400]}>
            Place Order
          </Typography>

          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {stockOptions.length === 0 ? (
                <MenuItem disabled>No stocks available</MenuItem>
              ) : (
                [...stockOptions]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("purchase")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Buy
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;
