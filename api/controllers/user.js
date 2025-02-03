import { db } from "../db.js";

// 🔹 Obtém todos os clientes
export const getUsers = (_, res) => {
  const q = "SELECT * FROM clientes";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }

    return res.status(200).json(data);
  });
};

// 🔹 Adiciona um novo cliente
export const addUser = (req, res) => {
  const q = "INSERT INTO clientes(`nome`, `email`, `telefone`, `data_nasc`, `cpf`, `endereco`, `sexo`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nasc,
    req.body.cpf,
    req.body.endereco,
    req.body.sexo,
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar usuário:", err);
      return res.status(500).json({ error: "Erro ao adicionar usuário" });
    }

    return res.status(201).json({ message: "Cliente criado com sucesso.", id: result.insertId });
  });
};

// 🔹 Atualiza um cliente pelo ID
export const updateUser = (req, res) => {
  const q = "UPDATE clientes SET `nome` = ?, `email` = ?, `telefone` = ?, `data_nasc` = ?, `cpf` = ?, `endereco` = ?, `sexo` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nasc,
    req.body.cpf,
    req.body.endereco,
    req.body.sexo,
  ];

  db.query(q, [...values, req.params.id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  });
};

// 🔹 Deleta um cliente pelo ID
export const deleteUser = (req, res) => {
  const q = "DELETE FROM clientes WHERE `id` = ?";

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  });
};
