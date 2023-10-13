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
    font-size: ${(props) => props.theme.font.size.sm};
    font-weight: ${(props) => props.theme.font.weight.bold};
    color: #12181f;
    &:hover {
      background-color: #8efbf7;
    }
  }
  a {
    color: #32e6e2;
    cursor: pointer;
    text-decoration: none;
    font-family: ${(props) => props.theme.font.family.one};
    font-size: ${(props) => props.theme.font.size.es};
    font-weight: ${(props) => props.theme.font.weight.bold};
    border-bottom: 1px solid #32e6e2;
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

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginForm;

    if (email === "" || password === "") {
      return alert("Fill in all fields");
    }

    if (!isEmail(email)) {
      alert("Invalid email");
      return;
    }

    try {
      setLoading(true);
      await login(email.toLowerCase(), password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        return alert("Invalid email or password.");
      } else {
        return alert("something went wrong");
      }
    }
  };

  return (
    <Section>
      <Container>
        <h1>Entrar</h1>
        <input
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Entrar"}
        </button>
        <p>
          Ainda não tem uma conta? <span onClick={() => navigate("/sign-up")}>Cadastre-se</span>
        </p>
        <span disabled={loading} onClick={() => navigate("/sign-up/forgot-password")}>
          <a>Esqueceu a senha?</a>
        </span>
      </Container>
      <Footer>
        <p>
          Ao entrar no aplicativo, você concorda com nossos <a href="#">termos de serviço.</a>
        </p>
      </Footer>
    </Section>
  );
};

export default Login;
