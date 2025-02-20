import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleLogout } from "../utility/autHelper";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

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

// 🔹 REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const validate = validateInputs(userData.email, userData.password);
    if (validate) return rejectWithValue(validate);
    try {
      const response = await axiosInstance.post("auth/register", userData);
      router.replace("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  }
);

// 🔹 LOGIN USER
const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log("✅ Token Decoded:", decoded); // 🔍 Lihat isi token
    return decoded;
  } catch (error) {
    console.error("❌ Gagal decode token:", error);
    return null;
  }
};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("auth/login", userData);

      if (response.status === 201) {
        const token = response.data?.data?.token;
        console.log("✅ Token diterima:", token);

        const decoded = decodeToken(token); // 🔹 Decode token
        console.log("🔹 Hasil decode:", decoded);

        if (!decoded?.role) {
          console.error("❌ Property 'role' tidak ditemukan!");
          return rejectWithValue("Role tidak ditemukan di token.");
        }

        // Simpan token dan role
        const expirestAt = (Date.now() + 2 * 60 * 60 * 1000).toString();
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("expirestAt", expirestAt);
        await AsyncStorage.setItem("role", decoded.role); // 🔹 Simpan role ke AsyncStorage

        dispatch(setToken(token)); // Simpan token di Redux
        dispatch(setUserRole(decoded.role)); // Simpan role di Redux

        router.replace("/(tabs)"); // Pindah ke menu utama
        return response.data;
      }
    } catch (error) {
      console.error("❌ Error Login:", error);
      return rejectWithValue(error.response?.data || "Login gagal");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    await handleLogout(dispatch); // Gunakan helper untuk logout
  }
);

// 🔹 CHECK TOKEN
export const CheckToken = createAsyncThunk(
  "auth/CheckToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const expirestAt = await AsyncStorage.getItem("expirestAt");

      if (!token || !expirestAt) return rejectWithValue("Token not found");

      // Cek apakah token sudah expired
      if (Date.now() >= parseInt(expirestAt)) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("expirestAt");
        return rejectWithValue("Token expired");
      }

      return token;
    } catch (error) {
      return rejectWithValue("Error checking token");
    }
  }
);

// 🔹 REDUCER
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    role: null, // 🔹 Tambahkan role di state Redux
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      console.log("📢 setToken dipanggil, token:", action.payload);
      state.token = action.payload;
      state.loading = false;
    },
    setUserRole: (state, action) => {
      console.log("📢 setToken dipanggil, role:", action.payload);
      state.userRole = action.payload;
    },

    resetError: (state) => {
      state.error = null;
    },
    updateExpiresAt: (state, action) => {
      state.expiresAt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(CheckToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(CheckToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, resetError, setUserRole, updateExpiresAt } =
  authSlice.actions;
export default authSlice.reducer;
