import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Profile from "../../components/Profile";

import UpDownArrowBtn from "../../components/UpDownArrowBtn";
import HomeIcon from "@mui/icons-material/Home";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

const Section = styled.section`
  display: flex;
  height: 100vh;
`;

const ChildrenBox = styled.div`
  padding: 5px;
  margin-top: 10px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${(props) => (props["data-show"] ? "250px" : "50px")};
  width: 100%;
  transition: all 0.3s;
  border-right: 1px solid #e8e7ee;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
  padding: 0px 10px 10px 10px;
`;

const Title = styled.div`
  position: ${(props) => (props["data-show"] ? "static" : "absolute")};
  top: ${(props) => (props["data-show"] ? "0" : "-60px")};
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #fff;
  border-bottom: ${(props) => (props["data-show"] ? "1px solid" : "none")};
  border-color: #e8e7ee;
  font-family: ${(props) => props.theme.font.family.one};
  h1 {
    font-size: 24px;
    @media (max-width: 630px) {
      font-size: 16px;
    }
  }
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  padding: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props["data-centralized"] ? "left" : "center")};
  color: ${(props) => (props["data-last-pressed"] ? "#6453e4" : "#3b3b4f")};
  background-color: ${(props) => (props["data-last-pressed"] ? "#f3f0ff" : "#fff")};
  max-width: 220px;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  margin: 2px 0;
  border-radius: ${(props) => (props["data-centralized"] ? "6px" : "0px")};
  &:hover {
    background-color: #f5f5fa;
  }

  p {
    margin-left: 10px;
    animation: fadeIn 0.5s ease-in-out;
    font-family: ${(props) => props.theme.font.family.two};
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const Workbench = ({ children, title, page }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTitleOpen, setIsTitleOpen] = useState(true);
  const [showButtonText, setShowButtonText] = useState(false);
  const [disableMenu, setDisableMenu] = useState(false);

  useEffect(() => {
    if (disableMenu) {
      setTimeout(() => {
        setDisableMenu(false);
      }, 600);
    }
  }, [disableMenu]);

  const handleButtonClick = (route) => {
    navigate(route);
  };

  const handleMenuClick = () => {
    setDisableMenu(true); // disable menu for a few seconds to avoid spamming.
    setIsMenuOpen(!isMenuOpen);

    if (isMenuOpen) {
      setShowButtonText(false);
    } else {
      setTimeout(() => {
        setShowButtonText(true);
      }, 500);
    }
  };

  return (
    <Section>
      <UpDownArrowBtn onClick={() => setIsTitleOpen(!isTitleOpen)} />
      <Menu data-show={isMenuOpen}>
        <LogoImg src={Logo} />

        <Button data-centralized={isMenuOpen} data-last-pressed={page === "0"} onClick={() => handleButtonClick("/home")}>
          <HomeIcon /> {showButtonText && <p>Home</p>}
        </Button>
        <Button data-centralized={isMenuOpen} data-last-pressed={page === "1"} onClick={() => handleButtonClick("/video-quiz")}>
          <InsertPageBreakIcon /> {showButtonText && <p>Video Quiz</p>}
        </Button>
        <Button data-centralized={isMenuOpen} data-last-pressed={page === "2"} onClick={() => handleButtonClick("/user-update")}>
          <PlagiarismIcon /> {showButtonText && <p>User</p>}
        </Button>
        <Button data-centralized={isMenuOpen} disabled={disableMenu} onClick={handleMenuClick}>
          {isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />} {showButtonText && <p>Menu ON/OFF</p>}
        </Button>
      </Menu>
      <Content>
        <Title data-show={isTitleOpen}>
          <h1>{title}</h1>
          <Profile />
        </Title>
        <ChildrenBox>{children}</ChildrenBox>
      </Content>
    </Section>
  );
};

export default Workbench;
