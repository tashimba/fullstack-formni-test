import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchCampaigns = createAsyncThunk(
  "/campaigns/fetchCampaigns",
  async () => {
    try {
      const { data } = await axios.get("/campaigns");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addCampaigns = createAsyncThunk(
  "/campaigns/addCampaigns",
  async (fields) => {
    try {
      const { data } = await axios.post("/campaigns/add", fields);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCampaign = createAsyncThunk(
  "/campaigns/deleteCampaign",
  async (id) => {
    try {
      const { data } = await axios.delete(`/campaigns/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchOneCampaign = createAsyncThunk(
  "/campaigns/fetchOneCampaign",
  async (id) => {
    try {
      const { data } = await axios.get(`/campaigns/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [fetchCampaigns.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    },
    [fetchCampaigns.rejected]: (state) => {
      state.status = "error";
    },
    [fetchCampaigns.pending]: (state) => {
      state.status = "loading";
    },
    //post
    [addCampaigns.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.items.push(action.payload);
    },
    [addCampaigns.rejected]: (state) => {
      state.status = "error";
    },
    [addCampaigns.pending]: (state) => {
      state.status = "loading";
    },
    //delete
    [deleteCampaign.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.items = state.items.filter((el) => el._id !== action.payload._id);
    },
    [deleteCampaign.rejected]: (state) => {
      state.status = "error";
    },
    [deleteCampaign.pending]: (state) => {
      state.status = "loading";
    },
    //get-one
    [fetchOneCampaign.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    },
    [fetchOneCampaign.rejected]: (state) => {
      state.status = "error";
    },
    [fetchOneCampaign.pending]: (state) => {
      state.status = "loading";
    },
  },
});

export const {} = campaignsSlice.actions;
export default campaignsSlice.reducer;
