const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const UserWithStock = require("../models/userstocks"); // ✅ Use correct model

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const results = [];
  const { email } = req.body;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        let user = await UserWithStock.findOne({ email });
        if (!user) {
          user = new UserWithStock({ email, stocks: [] });
        }

        // Insert new stocks or update existing ones
        for (const { symbol, quantity, avgPrice } of results) {
          const existing = user.stocks.find((s) => s.symbol === symbol);
          if (existing) {
            const totalQty = Number(existing.quantity) + Number(quantity);
            const newAvg =
              (existing.avgPrice * existing.quantity + avgPrice * quantity) / totalQty;

            existing.quantity = totalQty;
            existing.avgPrice = newAvg;
          } else {
            user.stocks.push({
              symbol,
              quantity: Number(quantity),
              avgPrice: Number(avgPrice),
            });
          }
        }

        await user.save();
        fs.unlinkSync(req.file.path);
        res.json({ message: "Stocks imported to user profile successfully." });
      } catch (err) {
        res.status(500).json({ message: "Import failed", error: err.message });
      }
    });
});

module.exports = router;
