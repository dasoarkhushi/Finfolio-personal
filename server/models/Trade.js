const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    tradeType: { type: String, enum: ["buy", "sell"], required: true },
    tradeTime: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Trade", tradeSchema);
