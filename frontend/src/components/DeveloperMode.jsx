import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  right: 10px;
  bottom: 100px;
`;

export const DeveloperMode = ({ onChange, value }) => {
  return (
    <Container>
      <label>DEBUG {" "}</label>
      <input type="checkbox" onChange={onChange} value={value} />
    </Container >
  );
};
