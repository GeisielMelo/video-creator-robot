import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.maxWidth || "25px"};
  height: ${(props) => props.maxHeight || "25px"};
  border-radius: 50%;
`;

const Spinner = styled.div`
  border: 4px solid #222831;
  border-top: 4px solid #393E46;
  border-radius: 50%;
  border-style: dotted;
  max-width: ${(props) => props.maxWidth || "25px"};
  max-height: ${(props) => props.maxHeight || "25px"};
  width: 100%;
  height: 100%;
  animation: spin 2s linear infinite;

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
