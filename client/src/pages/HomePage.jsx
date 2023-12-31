import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Paper,
  Button,
  IconButton,
  Typography,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import "@fontsource/roboto/500.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns, deleteCampaign } from "../redux/campaignsSlice";
import DialogCampaign from "../components/Dialog";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.campaigns.items);
  const status = useSelector((state) => state.campaigns.status);

  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    dispatch(fetchCampaigns());
  }, []);
  const deleteHandler = (e, id) => {
    e.stopPropagation();
    dispatch(deleteCampaign(id));
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
      width={"100vw"}
    >
      {status === "loading" ? (
        <CircularProgress />
      ) : rows ? (
        rows.length ? (
          <>
            <TableContainer
              component={Paper}
              sx={{
                width: "60vw",
                maxHeight: "70vh",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4">Кампании</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => setOpenDialog(true)}
                      >
                        Добавить
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows.map((row) => (
                      <TableRow
                        onClick={() => navigate(`/${row._id}`)}
                        hover
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => deleteHandler(e, row._id)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Stack direction={"column"} textAlign={"center"} spacing={10}>
            <Box>
              <Typography variant="h2">Добро пожаловать в </Typography>

              <Typography variant="h2">Fromni!</Typography>
            </Box>

            <Button
              onClick={() => setOpenDialog(true)}
              variant="contained"
              color="success"
              size="large"
            >
              Создать первую кампанию!
            </Button>
          </Stack>
        )
      ) : (
        <Stack spacing={3} alignItems={"center"}>
          <Typography variant="h3">Упс...</Typography>
          <Typography variant="h3">Произошла ошибка</Typography>
        </Stack>
      )}
      <DialogCampaign open={openDialog} setOpen={setOpenDialog} />
    </Grid>
  );
};

export default HomePage;
