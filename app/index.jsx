import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  //roting for loginScreen
  const loginRoute = useRouter();
  const HandelLoginRoute = () => {
    loginRoute.push("/login");
  };
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
        <View className="mt-[50] justify-center items-center">
          <TouchableOpacity
            onPress={HandelLoginRoute}
            className=" bg-[#0170bc] w-[250] h-[60] rounded-full justify-center "
          >
            <Text className="text-white text-3xl font-bold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
