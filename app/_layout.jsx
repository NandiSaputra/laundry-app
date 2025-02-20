import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import store from "../store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../global.css";
import { AppState } from "react-native";
import { updateExpiresAt } from "../store/authSlice";
import { PaperProvider } from "react-native-paper";

const AppLayout = () => {
  const dispacth = useDispatch();
  const { expiresAt } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkTokexExpiry = async () => {
      if (!expiresAt) return;
      const now = new Date();
      if (now >= expiresAt) {
        dispacth(logoutUser());
      }
    };
    checkTokexExpiry();

    const subcribe = AppState.addEventListener("change", (check) => {
      if (check === "active") {
        dispacth(updateExpiresAt());
      }
    });
    return () => subcribe.remove();
  }, [dispacth, expiresAt]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
const RootLayout = () => {
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
      <PaperProvider>
        <AppLayout />
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
