import express from "express";
import mongoose from "mongoose";
import {
  addCampaign,
  deleteCampaign,
  getCampaign,
  getOneCampaign,
} from "./controllers/CampaignController.js";
import cors from "cors";

import {
  addChannel,
  getChannels,
  getOneChannel,
} from "./controllers/ChannelControllers.js";

mongoose
  .connect(
    "mongodb+srv://timur:qwenpass@cluster0.ct4dmc8.mongodb.net/fromni?retryWrites=true&w=majority"
  )
  .then(() => console.log("bd ok"))
  .catch((er) => console.log(er));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/campaigns/add", addCampaign);
app.get("/campaigns", getCampaign);
app.get("/campaigns/:id", getOneCampaign);
app.delete("/campaigns/:id", deleteCampaign);

app.post("/channels", addChannel);
app.get("/channels", getChannels);
app.get("/channels/:id", getOneChannel);

app.listen(5000, (err) => {
  err ? console.log(err) : console.log("server OK");
});
