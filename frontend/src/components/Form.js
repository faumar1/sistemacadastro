import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

// 🔗 URL da API
const API_URL = process.env.REACT_APP_API_URL || "https://meu-backend-api-salaorm-5d14213af4d9.herokuapp.com/api/users";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome || "";
      user.email.value = onEdit.email || "";
      user.telefone.value = onEdit.telefone || "";
      user.data_nasc.value = onEdit.data_nasc || "";
      user.cpf.value = onEdit.cpf || "";
      user.endereco.value = onEdit.endereco || "";
      user.sexo.value = onEdit.sexo || "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.telefone.value ||
      !user.data_nasc.value ||
      !user.cpf.value ||
      !user.endereco.value ||
      !user.sexo.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const payload = {
      nome: user.nome.value,
      email: user.email.value,
      telefone: user.telefone.value,
      data_nasc: user.data_nasc.value,
      cpf: user.cpf.value,
      endereco: user.endereco.value,
      sexo: user.sexo.value,
    };

    try {
      if (onEdit) {
        await axios.put(`${API_URL}/${onEdit.id}`, payload);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axios.post(API_URL, payload);
        toast.success("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
      console.error(error);
    }

    // Resetar campos
    user.nome.value = "";
    user.email.value = "";
    user.telefone.value = "";
    user.data_nasc.value = "";
    user.cpf.value = "";
    user.endereco.value = "";
    user.sexo.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="container mt-4 p-4 bg-white shadow rounded"
    >
      {/* ... mantém os campos do formulário como estão */}
    </form>
  );
};

export default Form;
