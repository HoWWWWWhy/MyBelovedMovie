import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const RootNativeStack = createNativeStackNavigator();

const Root = () => (
  <RootNativeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <RootNativeStack.Screen
      name="Tabs"
      component={Tabs}
    ></RootNativeStack.Screen>
    <RootNativeStack.Screen
      name="Stack"
      component={Stack}
    ></RootNativeStack.Screen>
  </RootNativeStack.Navigator>
);

export default Root;
