import CampaignModel from "../models/Campaign.js";
import ChannelModel from "../models/Channel.js";

export const addCampaign = async (req, res) => {
  try {
    const doc = new CampaignModel({
      name: req.body.name,
      channels: req.body.channels,
    });
    const campaign = await doc.save();

    res.json(campaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось добавить кампанию",
    });
  }
};

export const getCampaign = async (req, res) => {
  try {
    const user = CampaignModel.find().then((e) => res.json(e));
  } catch (error) {
    res.status(500).json({
      message: "Кампания не найдена",
    });
  }
};

export const deleteCampaign = async (req, res) => {
  const campaignFound = await CampaignModel.findOneAndDelete({
    _id: req.params.id,
  });
  if (!campaignFound) {
    return res.status(500).json({
      message: "Не удалось получить кампанию",
    });
  } else {
    const channels = await ChannelModel.deleteMany({
      campaignId: req.params.id,
    });

    console.log(channels);
    return res.status(200).json(campaignFound);
  }
};

export const getOneCampaign = async (req, res) => {
  const campaignFound = await CampaignModel.findOne({
    _id: req.params.id,
  });
  if (!campaignFound) {
    return res.status(500).json({
      message: "Не удалось получить кампанию",
    });
  } else return res.status(200).json(campaignFound);
};
