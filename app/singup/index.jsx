import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import RNPickerSelect from "react-native-picker-select"; // 🔹 Import Dropdown

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // 🔹 Default "employee"
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const dispatch = useDispatch();

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

  const handleRegister = () => {
    if (validateInputs()) {
      dispatch(
        registerUser({
          name,
          email,
          username,
          password,
          role, // 🔹 Kirim role yang dipilih
        })
      );
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("employee"); // 🔹 Reset role ke default
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 w-full"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="w-full"
        >
          <View className="flex-[0.3] justify-end items-center w-full">
            <Image source={require("../../assets/images/login-image.png")} />
          </View>
          <View className="bg-[#E1EDFF] flex-[0.7] w-full rounded-t-3xl">
            <View className="pl-5 pt-9 gap-2">
              <Text className="text-3xl font-bold">Sign Up</Text>
              <Text className="text-[#a3a5a8] text-lg">
                Please Create Your Account
              </Text>
            </View>

            {/* Form Sign Up */}
            <View className="pt-8 px-6 gap-5">
              <View className="relative">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  className="px-6 p-4 rounded-lg border border-[#367aff]"
                />
                <Text className="absolute left-6 top-[-8] bg-white px-1 text-sm text-[#367aff]">
                  Name
                </Text>
              </View>

              <View className="relative">
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  className="px-6 p-4 rounded-lg border border-[#367aff]"
                />
                <Text className="absolute left-6 top-[-8] bg-white px-1 text-sm text-[#367aff]">
                  Username
                </Text>
              </View>

              <View className="relative">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  className={`px-6 p-4 rounded-lg border ${
                    !isEmailValid ? "border-red-500" : "border-[#367aff]"
                  }`}
                />
                {!isEmailValid && (
                  <Text className="text-red-500">Email is invalid</Text>
                )}
                <Text className="absolute left-6 top-[-8] bg-white px-1 text-sm text-[#367aff]">
                  Email
                </Text>
              </View>

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className={`px-6 p-4 rounded-lg border ${
                    !isPasswordValid ? "border-red-500" : "border-[#367aff]"
                  }`}
                />
                {!isPasswordValid && (
                  <Text className="text-red-500">Password is invalid</Text>
                )}
                <Text className="absolute left-6 top-[-8] bg-white px-1 text-sm text-[#367aff]">
                  Password
                </Text>
              </View>

              {/* 🔹 Pilih Role */}
              <View className="relative">
                <Text className="absolute left-6 top-[-8] bg-white px-1 text-sm text-[#367aff]">
                  Role
                </Text>
                <RNPickerSelect
                  onValueChange={(value) => setRole(value)}
                  items={[
                    { label: "Employee", value: "employee" },
                    { label: "Admin", value: "admin" },
                  ]}
                  value={role}
                />
              </View>
            </View>

            <View className="px-6 p-8 items-center gap-3">
              <TouchableOpacity
                onPress={handleRegister}
                className="bg-[#367aff] w-[180] p-4 rounded-lg"
              >
                <Text className="text-white font-bold text-center">
                  Sign Up
                </Text>
              </TouchableOpacity>

              <View className="relative items-center w-full">
                <Text className="bg-[#a3a5a8] h-[0.8] w-[180]"></Text>
                <Text className="absolute bg-[#E1EDFF] px-2">or</Text>
              </View>

              <Text className="text-[#a3a5a8]">
                Already have an account?
                <Link
                  replace
                  href="./login"
                  className="text-[#367aff] pl-1 underline font-bold"
                >
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
