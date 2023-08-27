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
import { useDispatch } from "react-redux";
import { postChannel } from "../redux/channelSlice";

const MessageCreator = ({
  campaign,
  activeChannel,
  channel,
  setMsgs,
  msgs,
}) => {
  const dispatch = useDispatch();

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
    if (channel) {
      setInputText(channel.text);
      setSelected(channel.variantButton);
      setButtons(channel.buttons);
      setUrlButtons(channel.urlButtons);
    } else {
      setInputText("");
      setSelected("");
      setButtons([]);
      setUrlButtons([]);
    }
  };

  useEffect(() => {
    fillData();
    setNoTextError("");
    setTextError("");
  }, [activeChannel]);

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

  if (!channel) {
    return (
      <Box
        sx={{
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
          minWidth: 400,
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
                channelFilled={!!channel}
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
