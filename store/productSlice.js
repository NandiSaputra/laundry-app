import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }
      const response = await axiosInstance.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }
      const response = await axiosInstance.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getProduct());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const editProduct = createAsyncThunk(
  "customers/editProduct",
  async ({ product }, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }

      const response = await axiosInstance.put(`/products`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getProduct());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "customers/deleteProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("no token found");
        return rejectWithValue("no token found");
      }
      const response = await axiosInstance.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getProduct());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          if (index !== -1) {
            state.data[index] = { ...state.data[index], ...action.payload }; // Pastikan membuat objek baru
          }
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
