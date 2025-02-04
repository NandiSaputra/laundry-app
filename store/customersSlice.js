import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

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
const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.customers = action.payload;
    });
  },
});
export default customerSlice.reducer;
