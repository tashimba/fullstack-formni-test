import ChannelModel from "../models/Channel.js";

export const addChannel = async (req, res) => {
  try {
    const doc = new ChannelModel({
      campaignId: req.body.campaignId,

      name: req.body.name,
      text: req.body.text,
      variantButton: req.body.variantButton,
      buttons: req.body.buttons,
      urlButtons: req.body.urlButtons,
    });
    const message = await doc.save();

    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось добавить сообщение",
    });
  }
};

export const getChannels = async (req, res) => {
  try {
    const channel = ChannelModel.find().then((e) => res.json(e));
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить канал",
    });
  }
};

export const getOneChannel = async (req, res) => {
  const channelFound = await ChannelModel.findOne({
    _id: req.params.id,
  });
  if (!channelFound) {
    return res.status(500).json({
      message: "Не удалось получить данные канала",
    });
  } else return res.status(200).json(channelFound);
};
