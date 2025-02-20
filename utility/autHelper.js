import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const handleLogout = async () => {
  try {
    console.log("🔴 Logging out...");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("expirestAt");
    router.replace("/login");
  } catch (error) {
    console.error("❌ Logout error:", error);
  }
};
