import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCustomer } from "../../store/customersSlice";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    console.log(dispatch);
    dispatch(getCustomer()).unwrap();
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white ">
      <View className="flex-[0.5] justify-end items-center w-full">
        <Image source={require("../../assets/images/login-image.png")} />
      </View>
      <View className="bg-[#E1EDFF] flex-[0.7] w-full rounded-t-3xl ">
        <View className="  pl-5 pt-9 gap-2">
          <Text className="text-3xl font-interBold  ">Sign In</Text>
          <Text className="text-[#a3a5a8] text-lg font-interItalic ">
            Please login to continue to your account.
          </Text>
        </View>
        <View className=" relative pt-8 px-6 gap-10 ">
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoFocus={false}
            mode="outlined"
            className=" px-6 p-4 rounded-lg border border-[#367aff]"
          />
          <Text className="absolute left-10 top-6 bg-white px-1 rounded-md text-sm text-[#367aff] font-interBold">
            Email
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoFocus={false}
            placeholder="************"
            mode="outlined"
            className=" px-6 p-4 rounded-lg border  border-[#a3a5a8]"
          />
        </View>
        <View className=" relative px-6 p-12 justify-center items-center gap-3 ">
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-[#367aff] w-[180] p-4 rounded-lg justify-center items-center"
          >
            <Text className="text-white font-interBold">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-[#367aff] w-[180] p-4 rounded-lg justify-center items-center"
          >
            <Text className="text-white font-interBold">Sign In</Text>
          </TouchableOpacity>

          <View className=" relative justify-center items-center w-full ">
            <Text className="  bg-[#a3a5a8] h-[0.8] w-[180] font-interBold" />
            <Text className="absolute   font-interMedium px-5 bg-[#E1EDFF] ">
              or
            </Text>
          </View>
          <View>
            <Text className="text-[#a3a5a8] ">
              Need an account?
              <Link
                replace
                href={"./singup"}
                className="text-[#367aff] pl-1 underline font-bolds"
              >
                Create one
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
