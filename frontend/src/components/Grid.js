import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px auto;
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px 0;
  table-layout: fixed;
`;

const Th = styled.th`
  text-align: start;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Td = styled.td`
  padding: 10px;
  text-align: start;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    display: block;
    text-align: right;
    position: relative;
    padding-left: 40%;

    &:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      font-weight: bold;
    }
  }
`;

const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 15px;
  }
`;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8800/api/users";

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (user) => {
    setOnEdit(user);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const { data } = await axios.delete(`${API_URL}/${id}`);

      setUsers(users.filter((user) => user.id !== id));
      toast.success(data);
    } catch (error) {
      toast.error(error.response?.data || "Erro ao excluir usuário");
    }
  };

  const handleCopyData = () => {
    if (users.length === 0) {
      toast.info("Nenhum usuário para copiar");
      return;
    }

    const textToCopy = users
      .map(
        (user) =>
          `${user.nome}\t${user.email}\t${user.telefone}\t${user.data_nasc || "N/A"}\t${user.cpf || "N/A"}\t${user.endereco || "N/A"}\t${user.sexo || "N/A"}`
      )
      .join("\n");

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Dados copiados para a área de transferência!");
    });
  };

  return (
    <TableContainer>
      <button
        onClick={handleCopyData}
        style={{
          marginBottom: "10px",
          padding: "8px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <FaCopy style={{ marginRight: "5px" }} /> Copiar Dados
      </button>

      <Table>
        <thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>Data de Nascimento</Th>
            <Th>CPF</Th>
            <Th>Endereço</Th>
            <Th>Sexo</Th>
            <Th>Ações</Th>
          </Tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td data-label="Nome">{user.nome}</Td>
              <Td data-label="Email">{user.email}</Td>
              <Td data-label="Telefone">{user.telefone}</Td>
              <Td data-label="Data de Nascimento">
                {user.data_nasc ? new Date(user.data_nasc).toLocaleDateString("pt-BR") : "N/A"}
              </Td>
              <Td data-label="CPF">{user.cpf || "N/A"}</Td>
              <Td data-label="Endereço">{user.endereco || "N/A"}</Td>
              <Td data-label="Sexo">{user.sexo || "N/A"}</Td>
              <Td>
                <FaEdit
                  onClick={() => handleEdit(user)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  title="Editar"
                />
                <FaTrash
                  onClick={() => handleDelete(user.id)}
                  style={{ cursor: "pointer", color: "red" }}
                  title="Excluir"
                />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default Grid;
