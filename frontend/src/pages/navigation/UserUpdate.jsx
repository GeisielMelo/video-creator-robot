import React, { useState } from "react";
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
      cursor: pointer;
    }
  }
`;

const AtualizarUsuario = () => {
  const testVariables = {
    name: "David",
    lastName: "Contabil",
    email: "david@tarssolucoes.com.br",
  };

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [actualPassword, setActualPassword] = useState("");

  return (
    <Container>
      <span>
        <h1>Nome</h1>
        <input
          type="text"
          value={name}
          placeholder={testVariables.name}
          onChange={(e) => setName(e.target.value)}
        />
      </span>

      <span>
        <h1>Sobrenome</h1>
        <input
          type="text"
          value={lastName}
          placeholder={testVariables.lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </span>

      <span>
        <h1>E-mail</h1>
        <input
          type="email"
          value={email}
          placeholder={testVariables.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </span>

      <span>
        <h1>Senha Atual</h1>
        <input
          type="password"
          value={actualPassword}
          onChange={(e) => setActualPassword(e.target.value)}
        />
      </span>

      <div>
        <button>Cancelar</button>
        <button style={{ backgroundColor: "#1abc9c", color: "#fff" }}>Salvar</button>
      </div>
    </Container>
  );
};

export default AtualizarUsuario;
