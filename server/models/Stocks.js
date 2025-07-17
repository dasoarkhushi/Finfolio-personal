const mongoose = require("mongoose");
const StockSchema = new mongoose.Schema({
  email: String,
  symbol: String,
  quantity: Number,
  price: { type: Number, required: true },
  time: { type: String, default: new Date().toISOString() }
});


module.exports = mongoose.model("Stock", StockSchema);
