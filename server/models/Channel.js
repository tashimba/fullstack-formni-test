import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
  {
    campaignId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    variantButton: {
      type: String,
      required: false,
    },
    buttons: {
      type: Array,
      required: false,
    },
    urlButtons: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Channel", ChannelSchema);
