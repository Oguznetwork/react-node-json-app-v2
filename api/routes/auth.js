const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ where: { username } });
  if (existing)
    return res.status(400).json({ message: "Kullanıcı adı zaten var" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });

  res.json({
    message: "Kayıt başarılı",
    user: { id: user.id, username: user.username },
  });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Şifre yanlış" });

  res.json({
    message: "Giriş başarılı",
    user: { id: user.id, username: user.username },
  });
});

module.exports = router;
