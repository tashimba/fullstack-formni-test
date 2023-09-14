import CampaignPage from "./pages/CampaignPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/:id" element={<CampaignPage />} />
  </Routes>
);
export default App;
