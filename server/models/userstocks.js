const mongoose = require("mongoose");

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
