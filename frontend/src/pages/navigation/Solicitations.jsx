import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import { fetchSolicitations, downloadVideo } from "../../services/api";
import DoneIcon from "@mui/icons-material/Done";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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

  const handleDownload = async (solicitationNumber) => {
    try {
      return await downloadVideo(user.id, solicitationNumber);
    } catch (error) {
      return console.error(error);
    }
  };

  const handleReadableTime = (updatedAt) => {
    const regex = /(\d{2}:\d{2})/;
    const match = updatedAt.match(regex);
    return match ? match[1] : null;
  };

  const handleReadableDate = (updatedAt) => {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = updatedAt.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>
      {solicitations === null ? (
        <Container key={0}>
          <p>ID: Loading...</p>
          <p>Loading...</p>
          <button disabled={true}>Download</button>
        </Container>
      ) : (
        solicitations.map((solicitation, index) => (
          <Container key={index}>
            <p>ID: {solicitation._id}</p>
            <p>
              {solicitation.status === "done" ? (
                <DoneIcon titleAccess={"Done"} style={{ color: "green" }} />
              ) : solicitation.status === "fail" ? (
                <ErrorOutlineIcon titleAccess={"Fail"} style={{ color: "red" }} />
              ) : solicitation.status === "pending" ? (
                <QueryBuilderIcon titleAccess={"Pending"} style={{ color: "orange" }} />
              ) : null}
            </p>
            <p>{handleReadableDate(solicitation.updatedAt)}</p>
            <p>{handleReadableTime(solicitation.updatedAt)}</p>
            <button
              disabled={solicitation.status === "done" ? false : true}
              onClick={() => handleDownload(solicitation._id)}
            >
              Download
            </button>
          </Container>
        ))
      )}
    </>
  );
};

export default Solicitations;
