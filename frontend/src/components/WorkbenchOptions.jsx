import React, { useState } from "react";
import styled from "styled-components";
import filters from "../config/WorkbenchCards.JSON";
import Card from "./Card";

const Filter = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 70px;
`;

const Option = styled.h1`
  margin: 0 20px;
  cursor: pointer;
`;

const WorkbenchOptions = () => {
  const tags = ["all", "copyright", "audio creation", "video creation", "picture creation"];
  const [selectedTag, setSelectedTag] = useState("all");

  // Função para renderizar cards baseados no json filters.
  // Renderiza todos os itens que contem a tag selecionada, (cada item presente no JSON contem uma key chamada "tag" que é uma arrway com todas as tags, se a tag existir dentro da arrwayy, renderize o item.)
  const handleRenderCards = () => {
    return (
      <Card title="Ai Text Dubbing" description="Ai Text Dubbing, dubbing in more than 140 languages." buttonDescription="Start Dubbing" url="/ai/dubbing" />
    );
  };

  console.log(filters)

  return (
    <>
      <Filter>
        {tags.map((item) => (
          <Option onClick={() => setSelectedTag(item)} key={item}>
            {item}
          </Option>
        ))}
      </Filter>
      {handleRenderCards()}
    </>
  );
};

export default WorkbenchOptions;
