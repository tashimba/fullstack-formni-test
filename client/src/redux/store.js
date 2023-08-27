import { configureStore } from "@reduxjs/toolkit";
import campaigns from "./campaignsSlice";
import channels from "./channelSlice";

const store = configureStore({
  reducer: {
    campaigns,
    channels,
  },
});

export default store;
