/* import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchStockDetails } from "../../api/yahoofinance";

const tradeSymbols = ["TCS.NS", "INFY.NS", "SBIN.NS"];

export default function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState("All");

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name || "");
      setUsername(storedUser.email || "");
    }

    const load = async () => {
      const results = await Promise.all(tradeSymbols.map(fetchStockDetails));
      console.log('results :>> ', results);
      const withMeta = results.map((s, i) => ({
        ...s,
        type: i % 2 === 0 ? "Buy" : "Sell",
        qty: 10 + i * 5,
        date: new Date().toLocaleDateString(),
      }));
      setTrades(withMeta);
    };
    load();
  }, []);

  const handleSave = () => {
    const updatedUser = { name, email: username };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const filteredTrades =
    filter === "All" ? trades : trades.filter((t) => t.type === filter);

    console.log('trades :>> ', trades);

  return (
    <Box m="20px">
      <Header title="PROFILE" subtitle="User Portfolio Summary" />

  
      <Card sx={{ backgroundColor: colors.primary[400] }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box>
              {isEditing ? (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={600}>
                    {name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    {username}
                  </Typography>
                  <Typography fontSize="12px" color={colors.grey[500]}>
                    Joined Jan 2023
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: colors.primary[400], mt: 2 }}>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 2,
          }}
        >
          {[
            { label: "Total Portfolio Value", value: "₹12,48,000" },
            { label: "Today’s P&L", value: "+₹8,320 (↑0.67%)", color: "green" },
            {
              label: "Overall P&L",
              value: "+₹1,45,600 (↑13.2%)",
              color: "green",
            },
            { label: "Cash Balance", value: "₹1,20,000" },
            { label: "Invested Amount", value: "₹11,28,000" },
          ].map((item, i) => (
            <Box key={i}>
              <Typography
                variant="body2"
                fontSize="13px"
                color={colors.grey[300]}
              >
                {item.label}
              </Typography>
              <Typography
                fontWeight={600}
                fontSize="15px"
                color={item.color || colors.grey[100]}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

   
      <Card sx={{ backgroundColor: colors.primary[400], mt: 2 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight={600}>
              Recent Trades
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="table" width="100%" fontSize="14px">
            <thead>
              <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                <th>Date</th>
                <th>Ticker</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Market Status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.symbol?.replace(".NS", "") || "N/A"}</td>

                  <td>{t.type}</td>
                  <td>{t.qty}</td>
                  <td>₹{t.priceToBook ? t.priceToBook.toFixed(2) : "N/A"}</td>
                  <td>{t.marketState}</td>
                  <td>Completed</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} */
 

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchStockDetails } from "../../services/yahooFetch";
import { fetchTradesByEmail } from "../../services/tradeService";


export default function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: 0,
    todaysPL: 0,
    overallPL: 0,
    invested: 0,
    cash: 120000,
  });



useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setName(storedUser.name || "");
    setUsername(storedUser.email || "");

    const load = async () => {
      const rawTrades = await fetchTradesByEmail(storedUser.email);
      const enriched = await Promise.all(
        rawTrades.map(async (t) => {
          const s = await fetchStockDetails(t.symbol);
          return {
            ...t,
            ...s,
            qty: t.quantity,
            type: t.quantity > 0 ? "Buy" : "Sell",
            date: new Date(t.tradeTime).toLocaleDateString(),
          };
        })
      );

      const invested = enriched
        .filter((t) => t.type === "Buy")
        .reduce((sum, t) => sum + t.price * t.qty, 0);

      const current = enriched.reduce((sum, t) => sum + (t.regularMarketPrice || 0) * t.qty, 0);
      const todayChange = enriched.reduce(
        (sum, t) =>
          sum +
          ((t.regularMarketPrice - t.regularMarketPreviousClose) * t.qty || 0),
        0
      );

      setPortfolioStats({
        totalValue: current,
        todaysPL: todayChange,
        overallPL: current - invested,
        invested,
        cash: 120000,
      });

      setTrades(enriched);
    };

    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }
}, []);

  const handleSave = () => {
    const updatedUser = { name, email: username };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const filteredTrades =
    filter === "All" ? trades : trades.filter((t) => t.type === filter);

  return (
    <Box m="20px">
      <Header title="PROFILE" subtitle="User Portfolio Summary" />

      <Card sx={{ backgroundColor: colors.primary[400] }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box>
              {isEditing ? (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={600}>{name}</Typography>
                  <Typography variant="body2" color={colors.grey[300]}>{username}</Typography>
                  <Typography fontSize="12px" color={colors.grey[500]}>Joined Jan 2023</Typography>
                </>
              )}
            </Box>
          </Box>
          <Button variant="contained" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: colors.primary[400], mt: 2 }}>
        <CardContent sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 2 }}>
          {[{
            label: "Total Portfolio Value",
            value: `₹${portfolioStats.totalValue.toLocaleString("en-IN")}`
          }, {
            label: "Today’s P&L",
            value: `₹${portfolioStats.todaysPL.toFixed(2)} (${((portfolioStats.todaysPL / portfolioStats.totalValue) * 100).toFixed(2)}%)`,
            color: portfolioStats.todaysPL >= 0 ? "green" : "red"
          }, {
            label: "Overall P&L",
            value: `₹${portfolioStats.overallPL.toFixed(2)} (${((portfolioStats.overallPL / portfolioStats.invested) * 100).toFixed(2)}%)`,
            color: portfolioStats.overallPL >= 0 ? "green" : "red"
          }, {
            label: "Cash Balance",
            value: `₹${portfolioStats.cash.toLocaleString("en-IN")}`
          }, {
            label: "Invested Amount",
            value: `₹${portfolioStats.invested.toLocaleString("en-IN")}`
          }].map((item, i) => (
            <Box key={i}>
              <Typography variant="body2" fontSize="13px" color={colors.grey[300]}>{item.label}</Typography>
              <Typography fontWeight={600} fontSize="15px" color={item.color || colors.grey[100]}>{item.value}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: colors.primary[400], mt: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>Recent Trades</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="table" width="100%" fontSize="14px">
            <thead>
              <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                <th>Date</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Market Change</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.symbol?.replace(".NS", "") || "N/A"}</td>
                  <td>{t.type}</td>
                  <td>{t.qty}</td>
                  <td>₹{t.regularMarketPrice?.toFixed(2) || "N/A"}</td>
                  <td>₹{t.regularMarketChange}</td>
                  <td>Completed</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
