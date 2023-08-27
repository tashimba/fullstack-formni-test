import {
  Alert,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const BtnCreator = ({
  activeChannel,
  selected,
  setSelected,
  buttons,
  setButtons,
  buttonText,
  setButtonText,
  buttonTextUrl,
  setButtonTextUrl,
  buttonUrl,
  setButtonUrl,
  urlButtons,
  setUrlButtons,
  channelFilled,
}) => {
  const [countButtonsErr, setCountButtonsErr] = useState("");
  const [alreadyButtons, setAlreadyButtons] = useState("");
  const [variantError, setVariantError] = useState("");
  const [urlVariantError, setUrlVariantError] = useState("");
  const [lenButtonsErr, setLenButtonsErr] = useState("");
  const [countUrlButtonsErr, setCountUrlButtonsErr] = useState("");
  const [urlError, setUrlError] = useState("");
  const addButton = () => {
    if (selected) {
      if (buttons.includes(buttonText)) {
        setAlreadyButtons("Такая кнопка уже существует");
      } else {
        if (selected == "standart") {
          if (activeChannel == "vk") {
            if (buttonText.length) {
              setButtons([...buttons, buttonText].slice(0, 40));
              setButtonText("");
              buttons.length > 39 &&
                setCountButtonsErr("Максимальное количество кнопок - 40");
            }
          }
          if (activeChannel == "wa") {
            if (buttonText.length) {
              if (buttonText.length < 20) {
                setButtons([...buttons, buttonText].slice(0, 10));
                setButtonText("");
                buttons.length > 9 &&
                  setCountButtonsErr("Максимальное количество кнопок - 10");
              } else {
                setLenButtonsErr("Максимальная длина текста в кнопке - 20 ");
              }
            }
          }
          if (activeChannel == "tg") {
            setButtons([...buttons, buttonText]);
            setButtonText("");
          }
        }
        if (selected == "inline") {
          if (activeChannel == "vk") {
            if (buttonText.length) {
              setButtons([...buttons, buttonText].slice(0, 10));
              setButtonText("");
              buttons.length > 9 &&
                setCountButtonsErr("Максимальное количество кнопок - 10");
            }
          }
          if (activeChannel == "wa") {
            if (buttonText.length) {
              if (buttonText.length < 20) {
                setButtons([...buttons, buttonText].slice(0, 3));
                setButtonText("");
                buttons.length > 2 &&
                  setCountButtonsErr("Максимальное количество кнопок - 3");
              } else {
                setLenButtonsErr("Максимальная длина текста в кнопке - 20 ");
              }
            }
          }
          if (activeChannel == "tg") {
            if (buttonText.length) {
              if (buttonText.length < 64) {
                setButtons([...buttons, buttonText]);
                setButtonText("");
              } else {
                setLenButtonsErr("Максимальная длина текста в кнопке - 64 ");
              }
            }
          }
        }
      }
    } else {
      setVariantError("Выберите вариант кнопок");
    }
  };

  const addUrlButton = () => {
    if (selected) {
      if (selected != "inline" && activeChannel != "wa") {
        if (buttonTextUrl.length && buttonUrl.length && isURL(buttonUrl)) {
          setUrlButtons([
            ...urlButtons,
            { text: buttonTextUrl, url: buttonUrl },
          ]);
          setButtonTextUrl("");
          setButtonUrl("");
        }
      } else {
        if (buttonTextUrl.length && buttonUrl.length && isURL(buttonUrl)) {
          if (urlButtons.length == 1) {
            setCountUrlButtonsErr(
              "Максимальное количество кнопок с ссылкой - 1"
            );
          } else {
            setUrlButtons(
              [...urlButtons, { text: buttonTextUrl, url: buttonUrl }].slice(
                0,
                1
              )
            );
            setButtonTextUrl("");
            setButtonUrl("");
          }
        }
      }
    } else {
      setUrlVariantError("Выберите вариант кнопок");
    }
  };

  const changeSelect = (e) => {
    setSelected(e.target.value);
    setVariantError("");

    if (checkBan) {
      setUrlButtons([]);
    }
  };

  const checkBan = () => {
    if (selected == "standart") {
      if (activeChannel != "vk") {
        return true;
      }
    }
    if (selected == "inline") {
      return false;
    }
  };

  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      setUrlError("Введенный текст не является ссылкой");
      return false;
    }
  };

  if (!channelFilled) {
    return (
      <Stack
        spacing={3}
        sx={{
          border: "1px solid rgba(1,1,1,0.2)",
          padding: 1,
        }}
      >
        <Typography pt={1} textAlign={"center"}>
          Клавиатура с кнопками
        </Typography>
        <Stack spacing={1}>
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel>Отображение</InputLabel>
            <Select
              sx={{ mb: 2 }}
              label="Отображение"
              value={selected}
              onChange={(e) => changeSelect(e)}
            >
              <MenuItem value={"standart"}>Стандартное</MenuItem>
              <MenuItem value={"inline"}>Inline</MenuItem>
            </Select>
          </FormControl>

          <Typography mt={0}>Кнопки с быстрым ответом</Typography>
          <Stack direction={"row"} spacing={2}>
            <TextField
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              sx={{ width: 300 }}
              size="small"
              label="Текст кнопки"
            ></TextField>
            <Button size="small" onClick={() => addButton()}>
              Добавить
            </Button>
          </Stack>
          {countButtonsErr && (
            <Alert
              onClose={() => {
                setCountButtonsErr("");
              }}
              severity="error"
            >
              {countButtonsErr}
            </Alert>
          )}
          {alreadyButtons && (
            <Alert
              onClose={() => {
                setAlreadyButtons("");
              }}
              severity="error"
            >
              {alreadyButtons}
            </Alert>
          )}
          {variantError && (
            <Alert
              onClose={() => {
                setVariantError("");
              }}
              severity="error"
            >
              {variantError}
            </Alert>
          )}
          {lenButtonsErr && (
            <Alert
              onClose={() => {
                setLenButtonsErr("");
              }}
              severity="error"
            >
              {lenButtonsErr}
            </Alert>
          )}

          <Stack
            direction={"row"}
            spacing={1}
            sx={{ width: "30vw", display: "flex", flexWrap: "wrap" }}
          >
            {buttons &&
              buttons.map((el, i) => (
                <Chip
                  key={i}
                  label={el}
                  onDelete={() =>
                    setButtons(buttons.filter((btn) => btn !== el))
                  }
                  variant="outlined"
                />
              ))}
          </Stack>
          {!checkBan() && (
            <>
              <Typography m={0}>Кнопки с ссылкой</Typography>
              <Stack direction={"row"} spacing={2}>
                <TextField
                  value={buttonTextUrl}
                  onChange={(e) => setButtonTextUrl(e.target.value)}
                  sx={{ width: 300 }}
                  size="small"
                  label="Текст кнопки"
                ></TextField>
                <TextField
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  sx={{ width: 300 }}
                  size="small"
                  label="Ссылка"
                ></TextField>
                <Button size="small" onClick={() => addUrlButton()}>
                  Добавить
                </Button>
              </Stack>
              {countUrlButtonsErr && (
                <Alert
                  onClose={() => {
                    setCountUrlButtonsErr("");
                  }}
                  severity="error"
                >
                  {countUrlButtonsErr}
                </Alert>
              )}
              {urlError && (
                <Alert
                  onClose={() => {
                    setUrlError("");
                  }}
                  severity="error"
                >
                  {urlError}
                </Alert>
              )}
              {urlVariantError && (
                <Alert
                  onClose={() => {
                    setUrlVariantError("");
                  }}
                  severity="error"
                >
                  {urlVariantError}
                </Alert>
              )}
            </>
          )}

          <Stack
            direction={"row"}
            spacing={1}
            sx={{ width: "30vw", display: "flex", flexWrap: "wrap" }}
          >
            {buttons &&
              urlButtons.map((el, i) => (
                <Chip
                  key={i}
                  label={el.text}
                  onDelete={() =>
                    setUrlButtons(
                      urlButtons.filter((btn) => btn.url !== el.url)
                    )
                  }
                  variant="outlined"
                />
              ))}
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    if (buttons.length || urlButtons.length)
      return (
        <Stack
          spacing={3}
          sx={{
            border: "1px solid rgba(1,1,1,0.2)",
            padding: 1,
          }}
        >
          <>
            <Typography pt={1} textAlign={"center"}>
              Клавиатура с кнопками
            </Typography>
            <Stack spacing={1}>
              <FormControl sx={{ width: 200 }} size="small">
                <InputLabel>Отображение</InputLabel>
                <Select sx={{ mb: 2 }} label="Отображение" value={selected}>
                  <MenuItem value={selected}>
                    {selected == "standart" ? "Стандартное" : "Inline"}
                  </MenuItem>
                </Select>
              </FormControl>
              {buttons.length > 0 && (
                <>
                  <Typography mt={0}>Кнопки с быстрым ответом</Typography>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ width: "30vw", display: "flex", flexWrap: "wrap" }}
                  >
                    {buttons &&
                      buttons.map((el, i) => (
                        <Chip key={i} label={el} variant="outlined" />
                      ))}
                  </Stack>
                </>
              )}
              {urlButtons.length > 0 && (
                <>
                  <Typography m={0}>Кнопки с ссылкой</Typography>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ width: "30vw", display: "flex", flexWrap: "wrap" }}
                  >
                    {buttons &&
                      urlButtons.map((el, i) => (
                        <Chip key={i} label={el.text} variant="outlined" />
                      ))}
                  </Stack>
                </>
              )}
            </Stack>
          </>
        </Stack>
      );
  }
};

export default BtnCreator;
