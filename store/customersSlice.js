import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { router } from "expo-router";
import { getBills } from "./billSlice";

export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("rerived token", token);
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }
      try {
        const response = await axiosInstance.get("/customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addCustomers = createAsyncThunk(
  "customers/addCustomers",
  async (customers, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }

      const response = await axiosInstance.post("/customers", customers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.replace("/customers");
      dispatch(getCustomer());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCustomers = createAsyncThunk(
  "customers/updateCustomers",
  async ({ customer }, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }

      const response = await axiosInstance.put(`/customers`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCustomer());
      dispatch(getBills());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCustomers = createAsyncThunk(
  "customers/deleteCustomers",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("no token found");
        console.error("no token found");
        return rejectWithValue("no token found");
      }
      const response = await axiosInstance.delete(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCustomer());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const customerSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomers.pending, (state) => {
        console.log("Redux: Mulai menghapus pelanggan...");
        state.loading = true;
      })
      .addCase(deleteCustomers.fulfilled, (state, action) => {
        console.log("Redux: pelanggan berhasil dihapus, ID:", action.payload);
        state.loading = false;
        state.data = state.data.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomers.rejected, (state, action) => {
        console.error("Redux: Gagal menghapus pelanggan", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomers.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) {
          if (index !== -1) {
            state.data[index] = { ...state.data[index], ...action.payload }; // Pastikan membuat objek baru
          }
        }
      })
      .addCase(updateCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default customerSlice.reducer;
