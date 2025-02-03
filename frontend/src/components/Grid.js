import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px auto;
`;

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px 0;
  word-break: break-word;
  table-layout: fixed;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 15px;
  }
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Td = styled.td`
  padding: 10px;
  text-align: start;
  border-bottom: 1px solid #eee;
  @media (max-width: 768px) {
    display: block;
    text-align: right;
    position: relative;
    padding-left: 40%;
  }

  @media (max-width: 768px) {
    &:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      font-weight: bold;
    }
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const { data } = await axios.delete(`http://localhost:8800/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success(data);
    } catch (error) {
      toast.error(error.response?.data || "Erro ao excluir usuário");
    }
  };

  const handleCopyData = () => {
    const textToCopy = users.map(user => `${user.nome}\t${user.email}\t${user.telefone}\t${user.data_nasc || "N/A"}\t${user.cpf || "N/A"}\t${user.endereco || "N/A"}\t${user.sexo || "N/A"}`).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Dados copiados para a área de transferência!");
    });
  };

  return (
    <TableContainer>
      <button onClick={handleCopyData} style={{ marginBottom: "10px", padding: "8px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        <FaCopy style={{ marginRight: "5px" }} /> Copiar Dados
      </button>
      <Table className="table table-striped">
        <Thead>
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
        </Thead>
        <Tbody>
          {users.map((item) => (
            <Tr key={item.id}>
              <Td data-label="Nome">{item.nome}</Td>
              <Td data-label="Email">{item.email}</Td>
              <Td data-label="Telefone">{item.telefone}</Td>
              <Td data-label="Data de Nascimento">{item.data_nasc || "N/A"}</Td>
              <Td data-label="CPF">{item.cpf || "N/A"}</Td>
              <Td data-label="Endereço">{item.endereco || "N/A"}</Td>
              <Td data-label="Sexo">{item.sexo || "N/A"}</Td>
              <Td>
                <FaEdit onClick={() => handleEdit(item)} style={{ cursor: "pointer", marginRight: "10px" }} />
                <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: "pointer", color: "red" }} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Grid;
