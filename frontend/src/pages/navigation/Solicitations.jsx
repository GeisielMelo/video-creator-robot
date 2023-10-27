import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import { fetchSolicitations, downloadVideo } from "../../services/api";
import DoneIcon from "@mui/icons-material/Done";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  min-height: 40px;
  padding: 0 10px;
  margin: 10px 0;
  flex-wrap: wrap;
  border-radius: 6px;
  box-shadow: 0px 0px 5px black;
  font-family: ${(props) => props.theme.font.family.two};
  p,
  button {
    padding: 0 10px;
    margin: 10px;
  }
  button {
    padding: 10px;
    border-radius: 6px;
    background-color: #1abc9c;
    color: white;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 5px #1abc9cb7;
      background-color: #1abc9cb9;
    }
    &:disabled {
      background-color: #f1f1f2;
      cursor: not-allowed;
      box-shadow: none;
      color: #8ea1a8;
    }
  }
`;

const Solicitations = () => {
  const { user } = useContext(AuthContext);
  const [solicitations, setSolicitations] = useState(null);

  useEffect(() => {
    if (!solicitations) {
      fetchSolicitations(user.id).then((res) => setSolicitations(res.data));
    }
  }, [solicitations]);

  const handleDownload = async (solicitationNumber, file) => {
    try {
      return await downloadVideo(user.id, solicitationNumber, file);
    } catch (error) {
      return console.error("Error on download");
    }
  };

  return (
    <>
      {solicitations === null ||
        (Array.isArray(solicitations) && solicitations.length === 0 && <p>No solicitations found.</p>)}
      {solicitations?.map((solicitation, index) => {
        return (
          <Container key={index}>
            <p>ID: {solicitation.folder}</p>
            <p>
              {solicitation.archive[0] ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                <QueryBuilderIcon style={{ color: "orange" }} />
              )}
            </p>
            <button
              disabled={!solicitation.archive[0]}
              onClick={() => handleDownload(solicitation.folder, solicitation.archive[0])}
            >
              Download
            </button>
          </Container>
        );
      })}
    </>
  );
};

export default Solicitations;
