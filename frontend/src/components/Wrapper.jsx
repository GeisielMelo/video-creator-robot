import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.loading === "true" ? "100vh" : "auto")};
`;
