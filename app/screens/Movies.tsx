import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Config from "react-native-config";

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

const Movie = styled.View`
  margin-right: 30px;
  align-items: center;
`;

const Title = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 600;
`;

const Votes = styled(Title)`
  font-size: 14px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 3px;
`;

const HColumn = styled.View`
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

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = () => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
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
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 10)}
                {movie.original_title.length > 10 ? "..." : null}
              </Title>

              <Votes>
                {movie.vote_average > 0
                  ? `⭐ ${movie.vote_average} / 10`
                  : `Coming soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListContainer>
        <ListTitle>Coming Soon</ListTitle>
        {upcoming.map((movie) => (
          <HMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <HColumn>
              <Title>{movie.original_title}</Title>
              <ReleaseDate>
                {new Date(movie.release_date).toLocaleDateString("ko-KR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </ReleaseDate>
              {movie.overview.length > 130 ? (
                <Overview>{movie.overview.slice(0, 130)}...</Overview>
              ) : null}
            </HColumn>
          </HMovie>
        ))}
      </ListContainer>
    </Container>
  );
};
export default Movies;
