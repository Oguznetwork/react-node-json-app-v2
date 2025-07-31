const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/api/message", (req, res) => {
  res.json({ message: "Merhaba React Client!" });
});

app.listen(PORT, () => {
  console.log(`API çalışıyor: http://localhost:${PORT}`);
});
