import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { CheckToken } from "../store/authSlice";

const WelcomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    dispatch(CheckToken())
      .unwrap()
      .then((result) => {
        if (result) {
          router.replace("/(tabs)"); // Jika token ada, langsung ke halaman utama
        }
      })
      .catch(() => {
        setCheckingToken(false); // Jika tidak ada token, tampilkan tombol "Get Started"
      });
  }, [dispatch]);

  if (loading || checkingToken) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0170bc" />
      </View>
    ); // Loading screen sebelum token dicek
  }

  return (
    <SafeAreaView className="bg-white flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/images/icon2.png")}
          className="w-[300] h-[300]"
        />
        <Text className="text-2xl font-bolds mb-3 ">
          LAUNDRY AT YOUR DOOR STEP
        </Text>
        <Text className="text-[15px] font-italic ">
          We offer quality laundry service at your door step
        </Text>

        {/* 🔹 Hanya tampilkan tombol jika token tidak ada */}
        {!token && (
          <View className="mt-[50] justify-center items-center">
            <TouchableOpacity
              onPress={() => router.replace("/login")}
              className=" bg-[#0170bc] w-[250] h-[60] rounded-full justify-center "
            >
              <Text className="text-white text-3xl font-bold text-center">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
