import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet } from "react-native";
import { makeImagePath } from "../utils";
import Poster from "./Poster";

const BgImage = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 50%;
  margin-left: 15px;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  font-size: 15px;
  font-weight: 600;
`;

const Votes = styled(Overview)`
  font-size: 14px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImage
        blurRadius={10}
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdropPath) }}
      />
      <Wrapper>
        <Poster path={posterPath} />
        <Column>
          <Title>{originalTitle}</Title>
          {voteAverage > 0 ? <Votes>⭐ {voteAverage}/10</Votes> : null}
          {overview.length > 100 ? (
            <Overview>{overview.slice(0, 100)}...</Overview>
          ) : null}
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;
