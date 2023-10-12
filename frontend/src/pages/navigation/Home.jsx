import { styled } from "styled-components";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import React from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 40px;
`;

const Subtitle = styled.p`
  font-family: ${(props) => props.theme.font.family.two};
  font-size: ${(props) => props.theme.font.size.sm};
  font-weight: ${(props) => props.theme.font.weight.bold};
  margin: 30px 0;
  max-width: 300px;
  span {
    color: red;
  }
`;

const Inicio = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Sistema</Title>
        <Subtitle>Bem vindo ao sistema de gerenciamento</Subtitle>
        <Subtitle>
          Para uma experiência otimizada em dispositivos móveis, como tablets e celulares, é aconselhável habilitar o modo de rotação automática.
          <br />
          {<ScreenRotationIcon />}
        </Subtitle>
        <Subtitle><span>Importante</span>: As informações contidas nas tabelas são fictícias e foram geradas exclusivamente para fins de teste.</Subtitle>
      </Container>
    </Wrapper>
  );
};

export default Inicio;
