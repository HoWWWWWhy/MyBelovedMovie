import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import Slide from "../components/Slide";
import Config from "react-native-config";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const API_KEY = Config.TMDB_API_KEY;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const TrendingScroll = styled.ScrollView`
  //margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = () => {
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    //fetch URL
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    //console.log(results);
    setNowPlaying(results);
  };

  const getUpcoming = async () => {
    //fetch URL
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    //console.log(results);
    setUpcoming(results);
  };

  const getTrending = async () => {
    //fetch URL
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    //console.log(results);
    setTrending(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    //console.log("onRefresh");
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
        loop
        autoplay
        autoplayTimeout={3}
        showsButtons={false}
        showsPagination={false}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListContainer>
        <ListTitle>Coming Soon</ListTitle>
        {upcoming.map((movie) => (
          <HMedia
            key={movie.id}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            overview={movie.overview}
            releaseDate={movie.release_date}
          />
        ))}
      </ListContainer>
    </Container>
  );
};
export default Movies;
