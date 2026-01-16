import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardHome from "./page/HomePage";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./page/LoginPage";
import BlogListPage from "./page/blog/category/BlogCategoryPage";
import MediaPage from "./page/media/MediaPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="media" element={<MediaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
