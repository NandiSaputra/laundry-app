import React from "react";
import { useFonts } from "expo-font"; // Hook untuk memuat font di Expo
import { Stack } from "expo-router";
import "../global.css";

import store from "../store/store";
import { Provider } from "react-redux";

const RootLayout = () => {
  // Memuat font custom
  const [fontsLoaded] = useFonts({
    "ComicNeue-Regular": require("../assets/fonts/ComicNeue-Regular.ttf"),
    "ComicNeue-Bold": require("../assets/fonts/ComicNeue-Bold.ttf"),
    "ComicNeue-Light": require("../assets/fonts/ComicNeue-Light.ttf"),
    "ComicNeue-Italic": require("../assets/fonts/ComicNeue-Italic.ttf"),
    "ComicNeue-BoldItalic": require("../assets/fonts/ComicNeue-BoldItalic.ttf"),
    "ComicNeue-LightItalic": require("../assets/fonts/ComicNeue-LightItalic.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "InterVariable-Italic": require("../assets/fonts/InterVariable-Italic.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
