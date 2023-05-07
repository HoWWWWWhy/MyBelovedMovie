import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Title = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 600;
`;

const Movie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const Column = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: 600;
  width: 80%;
`;

const ReleaseDate = styled.Text`
  color: black;
  font-size: 12px;
  margin-vertical: 3px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  voteAverage?: number;
  releaseDate?: string;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  voteAverage,
  releaseDate,
}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Column>
        <Title>{originalTitle}</Title>
        {releaseDate ? (
          <ReleaseDate>
            {new Date(releaseDate).toLocaleDateString("ko-KR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </ReleaseDate>
        ) : null}
        {voteAverage ? <Votes voteAverage={voteAverage} /> : null}
        {overview.length > 100 ? (
          <Overview>{overview.slice(0, 100)}...</Overview>
        ) : null}
      </Column>
    </Movie>
  );
};

export default HMedia;
