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

const Register = () => {
  const navigate = useNavigate();
  const { register, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    registerForm.name &&
    registerForm.lastName &&
    registerForm.email &&
    registerForm.password &&
    registerForm.confirmPassword
      ? setCanSubmit(true)
      : setCanSubmit(false);
  }, [registerForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password, confirmPassword } = registerForm;

    if (!name || !lastName || !email || !password || !confirmPassword) {
      setWarning({ message: "Fill all fields", type: "warning" });
      return;
    }

    if (password !== confirmPassword) {
      setWarning({ message: "Passwords don't match", type: "error" });
      return;
    }

    if (!isEmail(email)) {
      setWarning({ message: "Invalid email", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await register(name, lastName, email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.status === 409) {
        setWarning({ message: "Email already in use", type: "warning" });
      } else {
        setWarning({ message: "Something went wrong", type: "error" });
      }
    }
  };

  return (
    <Section>
      <Container>
        <Logo src={logoImage} alt="logo" width={200} height={200} />
        <Title>Sign up</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            disabled={loading}
            type="text"
            placeholder="Name"
            autoComplete="off"
            value={registerForm.name}
            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
          />
          <Input
            disabled={loading}
            type="text"
            placeholder="Last Name"
            autoComplete="off"
            value={registerForm.lastName}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, lastName: e.target.value })
            }
          />
          <Input
            disabled={loading}
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            value={registerForm.email}
            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
          />
          <Input
            disabled={loading}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={registerForm.password}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, password: e.target.value })
            }
          />
          <Input
            disabled={loading}
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={registerForm.confirmPassword}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
            }
          />

          <SubmitButton disabled={loading || !canSubmit} type="submit">
            {loading ? <Loading /> : <ArrowRightAltIcon />}
          </SubmitButton>
        </Form>

        <ChangePage disabled={loading} onClick={() => navigate("/sign-in")}>
          SIGN IN
        </ChangePage>

        {warning && <Warning message={warning.message} type={warning.type} />}
      </Container>
    </Section>
  );
};

export default Register;
