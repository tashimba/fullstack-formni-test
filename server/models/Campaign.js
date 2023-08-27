import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    channels: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", CampaignSchema);
