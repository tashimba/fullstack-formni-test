import {
  Box,
  Typography,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampaigns } from "../redux/campaignsSlice";
import MessageCreator from "../components/MessageCreator";
import { getChannels } from "../redux/channelSlice";

const CampaignPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampaigns());
    dispatch(getChannels());
  }, []);

  const campaign = useSelector((state) =>
    state.campaigns.items.find((el) => el._id === params.id)
  );

  const channels = useSelector((state) => state.channels.channel);

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

        {openChannel.open && campaign && openChannel.selectedChannel && (
          <MessageCreator
            msgs={msgs}
            setMsgs={setMsgs}
            campaign={campaign}
            activeChannel={openChannel.selectedChannel}
            channel={channels.find((el) => {
              if (
                el?.campaignId == campaign._id &&
                el?.name == openChannel.selectedChannel
              )
                return el;
            })}
          />
        )}
      </Box>
    </>
  );
};

export default CampaignPage;
