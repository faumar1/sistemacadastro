const express = require("express");
const path = require("path");
const app = express();

// Rotas da API aqui
app.use("/api/users", require("./routes/users"));

// Servir React em produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.js"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
