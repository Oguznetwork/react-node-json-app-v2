const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const sequelize = require("./sequelize");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  await sequelize.sync();
})();

app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Eksik veri" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    res.json({ message: "Kayıt başarılı" });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Kullanıcı adı alınmış" });
    } else {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Eksik veri" });

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Şifre yanlış" });

    res.json({
      message: "Giriş başarılı",
      user: { id: user.id, username: user.username },
    });
  } catch {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

app.listen(5000, () => console.log("API 5000 portunda çalışıyor"));
