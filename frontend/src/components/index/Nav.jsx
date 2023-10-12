import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logo from "../../assets/img/logo.png";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  z-index: 2;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  height: 80px;
  padding: 0 20px;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 50px;
    height: 50px;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 20px;

  span {
    display: flex;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    text-decoration: none;
    color: black;
    font-family: ${(props) => props.theme.font.family.one};
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  button {
    height: 40px;
    width: max-content;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid black;
    font-family: ${(props) => props.theme.font.family.one};
    transition: 0.2s;
  }
  .left {
    background: transparent;
    border-color: black;
  }
  .right {
    background: black;
    color: white;
    border: black;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  button {
    height: 40px;
    width: max-content;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid black;
    font-family: ${(props) => props.theme.font.family.one};
    transition: 0.2s;
  }
  .left {
    background: transparent;
    border-color: black;
  }
  .right {
    background: black;
    color: white;
    border: black;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    text-decoration: none;
    color: black;
    font-family: ${(props) => props.theme.font.family.one};
  }
`;

const Nav = ({ isAuthenticated, isMobile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleInternalLinkClick = (id) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    const targetElement = document.getElementById(id);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
      <Container>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        {!isMobile ? (
          <>
            <Navigation>
              <span>
                <a onClick={() => handleInternalLinkClick("home")} href="#">
                  Início
                </a>
                <a href="#">Planos</a>
                <a href="#">Notícias</a>
              </span>
              <a onClick={() => handleInternalLinkClick("footer")} href="#">
                Contato
              </a>
            </Navigation>
            <Buttons>
              {isAuthenticated ? (
                <>
                  <button className="right" onClick={() => navigate("/home")}>
                    Área de Clientes
                  </button>
                </>
              ) : (
                <>
                  <button className="left" onClick={() => navigate("/sign-in")}>
                    Entrar
                  </button>
                  <button className="right" onClick={() => navigate("/sign-up")}>
                    Registrar
                  </button>
                </>
              )}
            </Buttons>
          </>
        ) : (
          <>
            <MenuIcon onClick={() => setIsMobileMenuOpen(true)} />
            {isMobileMenuOpen && (
              <MobileMenu>
                <a onClick={() => handleInternalLinkClick("home")} href="#">
                  Início
                </a>
                <a href="#">Planos</a>
                <a href="#">Notícias</a>
                <a onClick={() => handleInternalLinkClick("footer")}>Contato</a>
                {isAuthenticated ? (
                  <button onClick={() => navigate("/home")}>Área de Clientes</button>
                ) : (
                  <>
                    <button className="left" onClick={() => navigate("/sign-in")}>
                      Entrar
                    </button>
                    <button className="right" onClick={() => navigate("/sign-up")}>
                      Registrar
                    </button>
                  </>
                )}
                <MenuOpenIcon onClick={() => setIsMobileMenuOpen(false)} />
              </MobileMenu>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Nav;
