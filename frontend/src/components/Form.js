import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

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

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, {
          nome: user.nome.value,
          email: user.email.value,
          telefone: user.telefone.value,
          data_nasc: user.data_nasc.value,
          cpf: user.cpf.value,
          endereco: user.endereco.value,
          sexo: user.sexo.value,
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          telefone: user.telefone.value,
          data_nasc: user.data_nasc.value,
          cpf: user.cpf.value,
          endereco: user.endereco.value,
          sexo: user.sexo.value,
        });
        toast.success("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    }

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
    <form ref={ref} onSubmit={handleSubmit} className="container mt-4 p-4 bg-white shadow rounded">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            name="nome"
            className="form-control"
            placeholder="Digite seu nome"
            required
            aria-label="Nome"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">E-mail</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="exemplo@email.com"
            required
            aria-label="E-mail"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Telefone</label>
          <input
            name="telefone"
            type="tel"
            className="form-control"
            placeholder="(99) 99999-9999"
            required
            aria-label="Telefone"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data de Nascimento</label>
          <input
            name="data_nasc"
            type="date"
            className="form-control"
            required
            aria-label="Data de Nascimento"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">CPF</label>
          <input
            name="cpf"
            className="form-control"
            placeholder="000.000.000-00"
            required
            aria-label="CPF"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Endereço</label>
          <input
            name="endereco"
            className="form-control"
            placeholder="Rua, Número, Bairro"
            required
            aria-label="Endereço"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sexo</label>
          <select
            name="sexo"
            className="form-select"
            required
            aria-label="Sexo"
          >
            <option value="" disabled selected>
              Selecione
            </option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-4">
            SALVAR
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
