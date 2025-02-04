import { db } from "../db.js";

// 🔹 Obtém todos os clientes
export const getUsers = async (_, res) => {
  try {
    const result = await db.query("SELECT * FROM clientes");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// 🔹 Adiciona um novo cliente
export const addUser = async (req, res) => {
  const q = "INSERT INTO clientes (nome, email, telefone, data_nasc, cpf, endereco, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nasc,
    req.body.cpf,
    req.body.endereco,
    req.body.sexo,
  ];

  try {
    const result = await db.query(q, values);
    res.status(201).json({ message: "Cliente criado com sucesso.", id: result.rows[0].id });
  } catch (err) {
    console.error("Erro ao adicionar usuário:", err);
    res.status(500).json({ error: "Erro ao adicionar usuário" });
  }
};

// 🔹 Atualiza um cliente pelo ID
export const updateUser = async (req, res) => {
  const q = "UPDATE clientes SET nome = $1, email = $2, telefone = $3, data_nasc = $4, cpf = $5, endereco = $6, sexo = $7 WHERE id = $8";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nasc,
    req.body.cpf,
    req.body.endereco,
    req.body.sexo,
    req.params.id,
  ];

  try {
    const result = await db.query(q, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// 🔹 Deleta um cliente pelo ID
export const deleteUser = async (req, res) => {
  const q = "DELETE FROM clientes WHERE id = $1";

  try {
    const result = await db.query(q, [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
