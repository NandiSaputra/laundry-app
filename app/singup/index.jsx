import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // state validatsi email dan password
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const dispatch = useDispatch();
  //handle validasi email dan password
  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      isValid = false;
    } else {
      setIsEmailValid(true);
    }
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      isValid = false;
    } else {
      setIsPasswordValid(true);
    }
    return isValid;
  };
  // handle register
  const handleRegister = () => {
    const isValid = validateInputs(email, password);
    if (isValid) {
      dispatch(
        registerUser({ name, email, username, password, role: "employee" })
      );
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white ">
      <View className="flex-[0.3] justify-end items-center w-full">
        <Image source={require("../../assets/images/login-image.png")} />
      </View>
      <View className="bg-[#E1EDFF] flex-[0.7]  w-full rounded-t-3xl ">
        <View className="  pl-5 pt-9 gap-2">
          <Text className="text-3xl font-interBold  ">Sign Up</Text>
          <Text className="text-[#a3a5a8] text-lg font-interItalic ">
            Please Create Your Account
          </Text>
        </View>
        {/*Form SignUp */}
        <View className=" relative pt-8 px-6 gap-10 ">
          <View className="relative">
            <TextInput
              value={name}
              onChangeText={setName}
              autoFocus={false}
              mode="outlined"
              className=" px-6 p-4 rounded-lg border border-[#367aff]"
            />
            <Text className="absolute left-6 top-[-8] bg-white px-1 rounded-md text-sm text-[#367aff] font-interBold">
              Name
            </Text>
          </View>
          <View className="relative">
            <TextInput
              value={username}
              onChangeText={setUsername}
              autoFocus={false}
              mode="outlined"
              className=" px-6 p-4 rounded-lg border border-[#367aff]"
            />
            <Text className="absolute left-6 top-[-8] bg-white px-1 rounded-md text-sm text-[#367aff] font-interBold">
              Username
            </Text>
          </View>
          <View className="relative">
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoFocus={false}
              mode="outlined"
              className={`px-6 p-4 rounded-lg border  ${
                !isEmailValid ? "border-red-500" : " border-[#367aff]"
              } `}
            />
            {!isEmailValid && (
              <Text className="text-red-500">Email is invalid</Text>
            )}
            <Text className="absolute left-6 top-[-8] bg-white px-1 rounded-md text-sm text-[#367aff] font-interBold">
              Email
            </Text>
          </View>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              autoFocus={false}
              mode="outlined"
              className={`px-6 p-4 rounded-lg border ${
                !isPasswordValid ? "border-red-500" : " border-[#367aff]"
              } `}
            />
            {!isPasswordValid && (
              <Text className="text-red-500">Password is invalid</Text>
            )}
            <Text className="absolute left-6 top-[-8] bg-white px-1 rounded-md text-sm text-[#367aff] font-interBold">
              Password
            </Text>
          </View>
        </View>
        <View className=" relative px-6 p-8 justify-center items-center gap-3 ">
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-[#367aff] w-[180] p-4 rounded-lg justify-center items-center"
          >
            <Text className="text-white font-interBold">Sign Up</Text>
          </TouchableOpacity>
          <View className=" relative justify-center items-center w-full ">
            <Text className="  bg-[#a3a5a8] h-[0.8] w-[180] font-interBold" />
            <Text className="absolute   font-interMedium px-5 bg-[#E1EDFF] ">
              or
            </Text>
          </View>
          <View>
            <Text className="text-[#a3a5a8] ">
              Already have an account?
              <Link
                replace
                href="./login"
                className="text-[#367aff] pl-1 underline font-bolds"
              >
                {" "}
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
