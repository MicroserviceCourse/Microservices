import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardHome from "./page/HomePage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
