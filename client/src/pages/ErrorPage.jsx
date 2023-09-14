import { Stack, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Stack alignItems={"center"} spacing={3}>
      <Typography variant="h2">Страница не найдена</Typography>

      <Typography variant="h1">404</Typography>
    </Stack>
  );
};

export default ErrorPage;
