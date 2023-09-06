import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isEmail } from "../utils/FieldsUtils";
import { Loading } from "../components/Loading";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Warning from "../components/StyledSign/Warnings";
import logoImage from "../images/logo.png";
import { Section, Container, Form, Logo, Title } from "../components/StyledSign/Styles";
import { SubmitButton, ChangePage } from "../components/StyledSign/Buttons";
import Input from "../components/StyledSign/Input";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    loginForm.email && loginForm.password ? setCanSubmit(true) : setCanSubmit(false);
  }, [loginForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;

    if (!email || !password) {
      setWarning({ message: "Invalid email or password.", type: "error" });
      return;
    }

    if (!isEmail(email)) {
      setWarning({ message: "Invalid email.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        setWarning({ message: "Invalid email or password.", type: "warning" });
      } else {
        setWarning({ message: "Something went wrong.", type: "error" });
      }

      setTimeout(() => {
        setWarning(null);
      }, 3000);
    }
  };

  return (
    <Section>
      <Container>
        <Logo src={logoImage} alt="logo" width={200} height={200} />
        <Title>Sign up</Title>

        <Form onSubmit={handleSubmit}>
          <>
            <Input
              disabled={loading}
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
            <Input
              disabled={loading}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </>

          <SubmitButton disabled={loading || !canSubmit} type="submit">
            {loading ? <Loading /> : <ArrowRightAltIcon />}
          </SubmitButton>
        </Form>

        <ChangePage disabled={loading} onClick={() => navigate("/sign-up")}>
          SIGN UP
        </ChangePage>

        {warning && <Warning message={warning.message} type={warning.type} />}
      </Container>
    </Section>
  );
};

export default Login;
