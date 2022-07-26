import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./app/navigation/Tabs";
import Stack from "./app/navigation/Stack";
import Root from "./app/navigation/Root";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [assets] = useAssets([require("./howwwwwhy_circle.png")]);
  let [fontsLoaded] = useFonts(Ionicons.font);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && assets && fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, assets, fontsLoaded]);

  //const isDark = useColorScheme() === "dark";
  if (!appIsReady || !assets || !fontsLoaded) {
    return null;
  }

  return (
    // <View
    //   style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //   onLayout={onLayoutRootView}
    // >
    //   <Text>SplashScreen Demo! 👋</Text>
    //   <Image source={assets[0]} />
    // </View>
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Root />
        {/* <Tabs /> */}
        {/* <Stack /> */}
      </NavigationContainer>
    </View>
  );
}
