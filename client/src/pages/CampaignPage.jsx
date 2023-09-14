import {
  Box,
  Typography,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampaigns } from "../redux/campaignsSlice";
import MessageCreator from "../components/MessageCreator";
import { getChannels } from "../redux/channelSlice";
import ErrorPage from "./ErrorPage";
import { deleteData } from "../redux/tmpChannelSlice";

const CampaignPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampaigns());
    dispatch(getChannels());
    return () => dispatch(deleteData());
  }, []);

  const campaign = useSelector((state) =>
    state.campaigns.items.find((el) => el._id === params.id)
  );

  const status = useSelector((state) => state.campaigns.status);

  const [msgs, setMsgs] = useState([]);

  const [openChannel, setOpenChannel] = useState({
    selectedChannel: campaign?.channels[0],
    open: true,
  });

  const [alert, setAlert] = useState(true);
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {status === "loading" ? (
          <CircularProgress />
        ) : campaign ? (
          <Stack mr={3}>
            <List>
              <Typography>Настроить каналы отправки:</Typography>
              {campaign && (
                <List>
                  {campaign.channels.map((el) => (
                    <ListItemButton
                      sx={{
                        borderRadius: 1,
                        border: "1px solid rgba(1,1,1,0.4)",
                        my: 1,
                      }}
                      key={el}
                      selected={openChannel.selectedChannel === el}
                      onClick={() =>
                        setOpenChannel({ selectedChannel: el, open: true })
                      }
                    >
                      <ListItemText primary={el} sx={{ textAlign: "center" }} />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </List>
            {alert && campaign?.channels.length > 1 && (
              <Alert
                onClose={() => {
                  setAlert(false);
                }}
                severity="error"
              >
                Переключившись
                <br />
                на другой канал
                <br /> без сохранения,
                <br /> вы потеряете данные!
              </Alert>
            )}
          </Stack>
        ) : (
          <ErrorPage />
        )}
        {openChannel.open && campaign && openChannel.selectedChannel && (
          <MessageCreator
            msgs={msgs}
            setMsgs={setMsgs}
            campaign={campaign}
            activeChannel={openChannel.selectedChannel}
          />
        )}
      </Box>
    </>
  );
};

export default CampaignPage;
