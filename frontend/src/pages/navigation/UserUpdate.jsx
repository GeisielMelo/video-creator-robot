import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateUserData } from "../../services/api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  @media (max-width: 630px) {
    align-items: center;
  }

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    gap: 40px;
    @media (max-width: 630px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0px;
    }
    h1 {
      font-family: ${(props) => props.theme.font.family.one};
      font-size: ${(props) => props.theme.font.size.sm};
      min-width: 150px;
    }
    p {
      color: #4e4e4e;
    }
    input {
      width: 100%;
      height: 40px;
      background-color: #f1f1f2;
      border: 1px solid rgba(212, 213, 216, 255);
      border-radius: 6px;
      padding: 0 10px;
      font-family: ${(props) => props.theme.font.family.two};
      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  div {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
      width: 70px;
      height: 30px;
      border: 1px solid rgba(212, 213, 216, 255);
      font-family: ${(props) => props.theme.font.family.two};
      font-size: ${(props) => props.theme.font.size.sm};
      border-radius: 6px;
      cursor: pointer;
    }
  }
`;

const AtualizarUsuario = () => {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!name || !lastName || !password) {
      return alert("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      await updateUserData(user.id, name, lastName, password);
      logout();
    } catch (error) {
      return alert("Cannot reach the server.");
    }
  };

  return (
    <Container>
      <span>
        <h1>Nome</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </span>

      <span>
        <h1>Sobrenome</h1>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </span>

      <span>
        <h1>E-mail</h1>
        <input
          type="email"
          value={email}
          placeholder={user ? user.email : "E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />
      </span>

      <span>
        <h1>Nova Senha</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </span>

      <span>
        <h1>Confirmar Senha</h1>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </span>

      <div>
        <button
          style={{ backgroundColor: "#1abc9c", color: "#fff" }}
          onClick={() => handleSubmit()}
        >
          Salvar
        </button>
      </div>
    </Container>
  );
};

export default AtualizarUsuario;
