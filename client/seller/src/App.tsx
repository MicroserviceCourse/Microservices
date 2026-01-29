import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SellerLayout from "./components/SellerLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import MediaPage from "./pages/MediaPage";
import InventoryImportPage from "./pages/InventoryImportPage";
import CreatePromotionPage from "./pages/CreatePromotionPage";
import PromotionPage from "./pages/PromotionPage";
import EditPromotionPage from "./pages/EditPromotionPage";
import ProfileAccount from "./pages/ProfileAccount";
import ShopRegisterPage from "./pages/shop/register/ShopRegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<SellerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="inventory/import" element={<InventoryImportPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="promotion/create" element={<CreatePromotionPage />} />
            <Route path="promotion" element={<PromotionPage />} />
            <Route path="promotion/:id" element={<EditPromotionPage />} />
            <Route path="product/create" element={<CreateProductPage />} />
            <Route path="product/:id/edit" element={<EditProductPage />} />
            <Route path="shop/register" element={<ShopRegisterPage/>}/>

            <Route path="profile" element={<ProfileAccount/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
