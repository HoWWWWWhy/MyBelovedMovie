import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 600;
  font-size: 14px;
`;

interface VotesProps {
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({ voteAverage }) => {
  return (
    <Text>{voteAverage > 0 ? `⭐ ${voteAverage} / 10` : `Coming soon`}</Text>
  );
};

export default Votes;
