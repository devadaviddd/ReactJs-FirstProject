import {createAsyncThunk, createSlice, Slice} from "@reduxjs/toolkit";
import axios from "axios";
import {USER_GET_ADDRESSES_URL, USER_GET_PROFILE_URL} from "../../config";
import {UserInformation} from "../../user";


const initialState: UserInformation = {
  email: '',
  username: '',
  phoneNumber: '',
  addresses: undefined
}

export const getProfile = createAsyncThunk('users/owner', async (config: {}, thunkAPI) => {
  const response = await axios.get(USER_GET_PROFILE_URL, config);
  return response.data;
});

export const getAddresses = createAsyncThunk('users/addresses', async (config: {}) => {
  const response = await axios.get(USER_GET_ADDRESSES_URL, config);
  return response.data;
});

export const userSlice: Slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state: any, {payload}) => {
      state.email = payload.email;
      state.username = payload.username;
      state.id = payload.id;
      state.phoneNumber = payload.phoneNumber;
    })
    builder.addCase(getAddresses.fulfilled, (state: any, {payload}) => {
      state.addresses = payload;
    })
  }
})


export const userAction = userSlice.actions;
