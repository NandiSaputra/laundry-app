import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validateInputs = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!emailRegex.test(email)) {
    return "Invalid email";
  }
  if (!passwordRegex.test(password)) {
    return "Invalid password";
  }
  return null;
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const validate = validateInputs(userData.email, userData.password);
    if (validate) {
      Alert.alert("Error", validate);
      return rejectWithValue(validate);
    }
    try {
      const response = await axiosInstance.post("auth/register", userData);
      if (response.status === 201) {
        router.push("/login");
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", userData);
      if (response.status === 201) {
        const token = response.data?.data?.token;
        if (token) {
          await AsyncStorage.setItem("token", token);
          console.log("token berhasil disimpan");
        } else {
          console.log("token gagal disimpan");
        }
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("token berhasil dihapus");
      return null;
    } catch (error) {
      return rejectWithValue("Gagal logout");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      //login
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
