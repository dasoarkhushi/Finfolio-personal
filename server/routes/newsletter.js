const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "You're Subscribed to FinFolio ",
    text: `Hi there,

Thanks for subscribing to FinFolio! You’ll receive weekly stock insights and market recaps.

– Team FinFolio`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("Nodemailer error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
