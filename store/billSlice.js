import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

// 🔹 Buat transaksi
export const createBill = createAsyncThunk(
  "bills/createBill",
  async (billData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/bills", billData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal membuat transaksi");
    }
  }
);

// 🔹 Ambil daftar transaksi
export const getBills = createAsyncThunk(
  "bills/getBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bills");
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal mengambil transaksi"
      );
    }
  }
);

const billSlice = createSlice({
  name: "bills",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBills.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default billSlice.reducer;
