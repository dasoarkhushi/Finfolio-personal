const express = require("express");
const router = express.Router();
const UserWithStock = require("../models/userstocks");

// GET /api/userstocks/:email → fetch user's portfolio
router.get("/:email", async (req, res) => {
  try {
    const user = await UserWithStock.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user.stocks || []);
  } catch (err) {
    console.error("Error fetching user stocks:", err);
    res.status(500).json({ message: "Failed to fetch stocks." });
  }
});

module.exports = router;
