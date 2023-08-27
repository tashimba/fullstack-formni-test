import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const postChannel = createAsyncThunk(
  "/channels/postChannel",
  async (fields) => {
    try {
      const { data } = await axios.post("/channels", fields);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getChannels = createAsyncThunk(
  "/channels/getChannels",
  async () => {
    try {
      const { data } = await axios.get("/channels");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  channel: [
    {
      name: "",
      text: "",
      typeButtons: "",
      buttons: [{}],
      urlButtons: [{}],
    },
  ],
  status: "loading",
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [postChannel.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.channel.push(action.payload);
    },
    [postChannel.rejected]: (state) => {
      state.status = "error";
    },
    [postChannel.pending]: (state) => {
      state.status = "loading";
    },
    //get
    [getChannels.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.channel = action.payload;
    },
    [getChannels.rejected]: (state) => {
      state.status = "error";
    },
    [getChannels.pending]: (state) => {
      state.status = "loading";
    },
  },
});

export const {} = channelsSlice.actions;
export default channelsSlice.reducer;
