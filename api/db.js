import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "salaoRM",
  password: "7154",
  port: 5432
});

db.connect()
  .then(() => console.log("📡 Conectado ao PostgreSQL"))
  .catch(err => console.error("Erro ao conectar ao PostgreSQL:", err));
