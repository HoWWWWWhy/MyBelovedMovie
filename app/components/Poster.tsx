import React from "react";
import styled from "styled-components/native";
import { makeImagePath } from "../utils";

const Card = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 3px;
`;
interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Card source={{ uri: makeImagePath(path) }} />;
};

export default Poster;
