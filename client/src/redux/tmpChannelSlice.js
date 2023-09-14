import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
};

const tmpChannelSlice = createSlice({
  name: "tmpChannels",
  initialState,
  reducers: {
    addData(state, action) {
      const selectedChannel = {
        name: action.payload.activeChannel,
        text: action.payload.inputText,
        variantButton: action.payload.selected,
        buttons: action.payload.buttons,
        urlButtons: action.payload.urlButtons,
        buttonText: action.payload.buttonText,
        buttonTextUrl: action.payload.buttonTextUrl,
        buttonUrl: action.payload.buttonUrl,
      };

      const ch = state.channels.find(
        (el) => el.name === action.payload.activeChannel
      );
      ch
        ? (state.channels = state.channels.map((el) => {
            if (el.name === action.payload.activeChannel) {
              return selectedChannel;
            } else {
              return el;
            }
          }))
        : state.channels.push(selectedChannel);
    },

    deleteData(state) {
      state.channels = [];
    },
  },
});

export const { addData, deleteData } = tmpChannelSlice.actions;
export default tmpChannelSlice.reducer;
