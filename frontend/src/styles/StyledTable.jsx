import styled from "styled-components";

export const TableContainer = styled.div`
  overflow-x: auto;
  table {
    font-family: ${(props) => props.theme.font.family.one};
    font-size: ${(props) => props.theme.font.size.sm};
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
  }

  table td,
  table th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  table tr:hover {
    background-color: #ddd;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #04aa6d;
    color: white;
  }
`;

export const TableNav = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  gap: 10px;
  flex-wrap: wrap;
`;
