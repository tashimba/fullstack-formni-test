import { useEffect, useState } from "react";
import BtnCreator from "./BtnCreator";
import {
  TextField,
  Stack,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postChannel } from "../redux/channelSlice";
import { addData } from "../redux/tmpChannelSlice";

const MessageCreator = ({
  campaign,
  activeChannel,
 
}) => {
  const dispatch = useDispatch();

  const channelData = useSelector((state) =>
    state.channels.channel.find(
      (el) => el.campaignId === campaign._id && el.name === activeChannel
    )
  );

  const tmpChannelData = useSelector((state) =>
    state.tmpChannels.channels.find((el) => el?.name === activeChannel)
  );
  console.log(tmpChannelData);

  const CampId = campaign._id;
  const [inputText, setInputText] = useState("");
  const [selected, setSelected] = useState("");
  const [buttons, setButtons] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [buttonTextUrl, setButtonTextUrl] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [urlButtons, setUrlButtons] = useState([]);

  const [textError, setTextError] = useState("");
  const [noTextError, setNoTextError] = useState("");

  const fillData = () => {
    if (channelData) {
      setInputText(channelData.text);
      setSelected(channelData.variantButton);
      setButtons(channelData.buttons);
      setUrlButtons(channelData.urlButtons);
    } else {
      tmpChannelData?.text
        ? setInputText(tmpChannelData?.text)
        : setInputText("");
      tmpChannelData?.variantButton
        ? setSelected(tmpChannelData?.variantButton)
        : setSelected("");
      tmpChannelData?.buttons
        ? setButtons(tmpChannelData?.buttons)
        : setButtons([]);
      tmpChannelData?.urlButtons
        ? setUrlButtons(tmpChannelData?.urlButtons)
        : setUrlButtons([]);
    }
  };

  useEffect(() => {
    fillData();
    setNoTextError("");
    setTextError("");
  }, [activeChannel, channelData]);

  useEffect(() => {
    !channelData &&
      dispatch(
        addData({
          CampId,
          activeChannel,
          inputText,
          selected,
          buttons,
          buttonText,
          buttonTextUrl,
          buttonUrl,
          urlButtons,
        })
      );
  }, [
    inputText,
    selected,
    buttons,
    buttonText,
    buttonTextUrl,
    buttonUrl,
    urlButtons,
  ]);

  const sendMsg = () => {
    if (inputText.length) {
      const fields = {
        campaignId: campaign._id,
        name: activeChannel,
        text: inputText,
        variantButton: selected,
        buttons: buttons,
        urlButtons: urlButtons,
      };
      dispatch(postChannel(fields));
    } else {
      setNoTextError("Для сохранения нужно ввести текст");
    }
  };

  const changeText = (e) => {
    setTextError("");
    setNoTextError("");
    if (activeChannel == "vk") {
      setInputText(e.target.value.slice(0, 4096));
      inputText.length > 4095 && setTextError("Текст слишком длинный");
    }
    if (activeChannel == "wa") {
      setInputText(e.target.value.slice(0, 1000));
      inputText.length > 999 && setTextError("Текст слишком длинный");
    }
    if (activeChannel == "tg") {
      setInputText(e.target.value.slice(0, 4096));
      inputText.length > 4095 && setTextError("Текст слишком длинный");
    }
    if (activeChannel == "sms") {
      setInputText(e.target.value);
    }
  };

  if (!channelData) {
    return (
      <Box
        sx={{
          width: 700,
          border: "1px solid rgba(1,1,1,0.5)",
          borderRadius: 3,
          p: 2,
          m: 0,
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={3}>
            <TextField
              sx={{ width: "35vw" }}
              multiline
              rows={4}
              label="Текст сообщения"
              value={inputText}
              onChange={(e) => changeText(e)}
            ></TextField>
            {textError && (
              <Alert onClose={() => setTextError("")} severity="error">
                {textError}
              </Alert>
            )}
            {noTextError && (
              <Alert onClose={() => setNoTextError("")} severity="error">
                {noTextError}
              </Alert>
            )}
            {activeChannel != "sms" && (
              <BtnCreator
                activeChannel={activeChannel}
                selected={selected}
                setSelected={setSelected}
                buttons={buttons}
                setButtons={setButtons}
                buttonText={buttonText}
                setButtonText={setButtonText}
                buttonTextUrl={buttonTextUrl}
                setButtonTextUrl={setButtonTextUrl}
                buttonUrl={buttonUrl}
                setButtonUrl={setButtonUrl}
                urlButtons={urlButtons}
                setUrlButtons={setUrlButtons}
              />
            )}
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                width: "10vw",
              }}
              size="small"
              color="success"
              variant="contained"
              onClick={() => {
                sendMsg();
              }}
            >
              Сохранить
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: 400,
          border: "1px solid rgba(1,1,1,0.5)",
          borderRadius: 3,
          p: 2,
          m: 0,
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={3}>
            <Typography>Текст: {inputText}</Typography>
            {activeChannel != "sms" && (
              <BtnCreator
                channelFilled={!!channelData}
                selected={selected}
                setSelected={setSelected}
                buttons={buttons}
                setButtons={setButtons}
                buttonText={buttonText}
                setButtonText={setButtonText}
                buttonTextUrl={buttonTextUrl}
                setButtonTextUrl={setButtonTextUrl}
                buttonUrl={buttonUrl}
                setButtonUrl={setButtonUrl}
                urlButtons={urlButtons}
                setUrlButtons={setUrlButtons}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    );
  }
};

export default MessageCreator;
