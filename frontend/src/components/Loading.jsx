import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.maxWidth || "20px"};
  height: ${(props) => props.maxHeight || "20px"};
  border-radius: 50%;
`;

const Spinner = styled.div`
  border: 4px solid ${(props) => props.theme.color.Navy.Light};
  border-top: 4px solid ${(props) => props.theme.color.Green.default};
  border-radius: 50%;
  max-width: ${(props) => props.maxWidth || "20px"};
  max-height: ${(props) => props.maxHeight || "20px"};
  width: 100%;
  height: 100%;
  animation: spin 1s linear infinite;

  transition: all 0.2s ease-in-out;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = ({ maxHeight, maxWidth }) => {
  return (
    <Container maxHeight={maxHeight} maxWidth={maxWidth}>
      <Spinner maxHeight={maxHeight} maxWidth={maxWidth} />
    </Container>
  );
};