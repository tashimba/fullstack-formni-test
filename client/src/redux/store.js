import { configureStore } from "@reduxjs/toolkit";
import campaigns from "./campaignsSlice";
import channels from "./channelSlice";
import tmpChannels from "./tmpChannelSlice";

const store = configureStore({
  reducer: {
    campaigns,
    channels,
    tmpChannels,
  },
});

export default store;
