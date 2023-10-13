import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { isEmail } from "../../utils/fields";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #060b10;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  margin: 0 100px;
  padding: 100px 0px;
  max-width: 700px;
  width: calc(100% - 200px);
  gap: 20px;

  @media (max-width: 769px) {
    margin: 0 50px;
    width: calc(100% - 100px);
  }
  @media (max-width: 480px) {
    margin: 0;
    width: calc(100% - 25px);
  }
  h1 {
    font-family: ${(props) => props.theme.font.family.one};
    font-size: ${(props) => props.theme.font.size.md};
    font-weight: ${(props) => props.theme.font.weight.bold};
    color: #fff;
  }
  input {
    max-width: 380px;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #12181f;
    border: 1px solid #3e454e;
    color: #fff;
    transition: 0.2s;
    &:focus {
      border-color: #fff;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  .passwords {
    border-color: ${(props) => (props["data-passwords"] ? "#3e454e" : "#dd3009")};
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 380px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #32e6e2;
    cursor: pointer;
    transition: 0.2s;
    font-family: ${(props) => props.theme.font.family.one};
    font-size: ${(props) => props.theme.font.size.es};
    font-weight: ${(props) => props.theme.font.weight.bold};
    color: #12181f;
    &:hover {
      background-color: #8efbf7;
    }
    &:disabled {
      background-color: #3e454e;
      cursor: not-allowed;
    }
  }
  p {
    color: #fff;
    text-decoration: none;
    font-family: ${(props) => props.theme.font.family.one};
    font-size: ${(props) => props.theme.font.size.es};
    font-weight: ${(props) => props.theme.font.weight.bold};
    span {
      color: #32e6e2;
      cursor: pointer;
      border-bottom: 1px solid #32e6e2;
    }
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #7e8183;
  font-family: ${(props) => props.theme.font.family.two};
  font-size: ${(props) => props.theme.font.size.sm};
  a {
    text-decoration: none;
    cursor: pointer;
    color: #7e8183;
    &:hover {
      color: #a1a7ab;
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const { user, register } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({ name: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password, confirmPassword } = registerForm;

    if (!name || !lastName || !email || !password || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!isEmail(email)) {
      alert("Invalid email");
      return;
    }

    try {
      setLoading(true);
      await register(name.toLowerCase(), lastName.toLowerCase(), email.toLowerCase(), password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 409) {
        alert("Email already in use");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Section>
      <Container data-passwords={passwordMatch}>
        <h1>Cadastre-se com e-mail</h1>
        <input
          type="text"
          placeholder="Nome"
          value={registerForm.name}
          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={registerForm.lastName}
          onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
          disabled={loading}
        />
        <input
          className="passwords"
          type="password"
          placeholder="Senha"
          value={registerForm.password}
          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
          disabled={loading}
        />
        <input
          className="passwords"
          type="password"
          placeholder="Confirmar Senha"
          value={registerForm.confirmPassword}
          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={loading || !passwordMatch}>
          Cadastrar
        </button>
        <p>
          Já possui uma conta? <span onClick={() => navigate("/sign-in")}>Entrar</span>
        </p>
      </Container>
      <Footer>
        <p>
          Ao se cadastrar no aplicativo, você concorda com nossos <a href="#">termos de serviço.</a>
        </p>
      </Footer>
    </Section>
  );
};

export default Register;
