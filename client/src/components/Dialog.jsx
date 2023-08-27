import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  IconButton,
  DialogActions,
  List,
  Checkbox,
  ListItem,
  ListItemText,
  DialogContentText,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { addCampaigns } from "../redux/campaignsSlice";

const DialogCampaign = ({ open, setOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const channelsTest = ["vk", "tg", "wa", "sms"];

  const [channelError, setChannelError] = useState("");
  const [nameError, setNameError] = useState("");

  const addHandler = (name) => {
    const channels = channelsTest.filter((el, id) => checked.includes(id));
    if (name.length) {
      if (channels.length) {
        const fields = {
          name,
          channels,
        };
        dispatch(addCampaigns(fields));
        setOpen(false);
        setInputValue("");
      } else setChannelError("Не указаны каналы отправки");
    } else setNameError("Не указано название кампании");
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle fontWeight={"600"}>Создать кампанию</DialogTitle>
      <DialogContent>
        <Input
          sx={{ width: "30vw", mb: 2 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Название"
        ></Input>
        <DialogContentText>Каналы отправки</DialogContentText>
        <List>
          {channelsTest.map((el, i) => (
            <ListItem key={el} sx={{ height: "30px" }}>
              <Checkbox
                checked={checked.indexOf(i) !== -1}
                onChange={handleToggle(i)}
              />
              <ListItemText primary={el} />
            </ListItem>
          ))}
        </List>
        {nameError && (
          <Alert
            onClose={() => {
              setNameError("");
            }}
            severity="error"
          >
            {nameError}
          </Alert>
        )}
        {channelError && (
          <Alert
            onClose={() => {
              setChannelError("");
            }}
            severity="error"
          >
            {channelError}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <IconButton onClick={() => addHandler(inputValue, "vk")}>
          <CheckIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCampaign;
