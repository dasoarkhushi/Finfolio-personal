/* const mongoose = require("mongoose");

const UserWithStocksSchema = new mongoose.Schema({
  name: String,
  email: String,
  stocks: [
    {
      symbol: String,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model("UserWithStocks", UserWithStocksSchema);
 */

// models/userstocks.js
const mongoose = require("mongoose");

// ✅ Define this first
const StockSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  avgPrice: Number,
});

// ✅ Then use it here
const UserWithStocksSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  stocks: { type: [StockSchema], default: [] }, // default ensures stocks is always an array
});

module.exports = mongoose.model("UserWithStocks", UserWithStocksSchema);
