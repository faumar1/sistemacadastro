import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

// Inicializa variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/users", userRoutes);

// Rota raiz (opcional)
app.get("/", (req, res) => {
  res.send("API está funcionando ✅");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});
