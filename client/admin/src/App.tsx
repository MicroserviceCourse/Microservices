import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardHome from "./page/HomePage";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./page/LoginPage";

import MediaPage from "./page/media/MediaPage";
import BlogTagPage from "./page/blog/tag/BlogTagPage";
import PromotionPage from "./page/promotion/PromotionPage";
import BlogCategoryPage from "./page/blog/category/BlogCategoryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="blog" >
              <Route path="categories" element={<BlogCategoryPage />} />
              <Route path="tags" element={<BlogTagPage />} />
            </Route>
            <Route path="media" element={<MediaPage />} />
            <Route path="promotion" element={<PromotionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
