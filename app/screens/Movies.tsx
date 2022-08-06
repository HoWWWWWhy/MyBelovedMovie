import React from "react";
import styled from "styled-components/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = ({
  navigation: { navigate },
}) => (
  <Button onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movies</Title>
  </Button>
);
export default Movies;
