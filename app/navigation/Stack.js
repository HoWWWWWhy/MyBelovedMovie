import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity onPress={() => navigate("Two")}>
      <Text>ONE</Text>
    </TouchableOpacity>
  </View>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity onPress={() => navigate("Three")}>
      <Text>TWO</Text>
    </TouchableOpacity>
  </View>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
      <Text>Search</Text>
    </TouchableOpacity>
  </View>
);
const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      presentation: "modal",
      animation: "fade",
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne}></NativeStack.Screen>
    <NativeStack.Screen name="Two" component={ScreenTwo}></NativeStack.Screen>
    <NativeStack.Screen
      name="Three"
      component={ScreenThree}
    ></NativeStack.Screen>
  </NativeStack.Navigator>
);

export default Stack;
