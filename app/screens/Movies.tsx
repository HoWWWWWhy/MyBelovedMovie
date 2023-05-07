import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
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
  margin-bottom: 10px;
`;

const TrendingScroll = styled.FlatList`
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

  const renderTrendingItem = ({ item }) => {
    return (
      <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
      />
    );
  };

  const renderTrendingItemSeparator = () => {
    return <View style={{ width: 20 }} />;
  };

  const renderUpcomingItem = ({ item }) => {
    return (
      <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}
      />
    );
  };

  const renderUpcomingItemSeparator = () => {
    return <View style={{ height: 20 }} />;
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
              data={trending}
              renderItem={renderTrendingItem}
              ItemSeparatorComponent={renderTrendingItemSeparator}
              keyExtractor={(item) => item.id + ""}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </ListContainer>
          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcoming}
      renderItem={renderUpcomingItem}
      ItemSeparatorComponent={renderUpcomingItemSeparator}
      keyExtractor={(item) => item.id + ""}
    />
  );
};
export default Movies;
