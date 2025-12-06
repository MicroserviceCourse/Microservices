import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SellerLayout from "./components/SellerLayout"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CreateProductPage from "./pages/CreateProductPage"
import EditProductPage from "./pages/EditProductPage"
import MediaPage from "./pages/MediaPage"

function App() {
  return (
    <>
     <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/dashboard" element={<SellerLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="product" element={<ProductPage/>}/>
                <Route path="media" element={<MediaPage/>}/>
                <Route path="product/create" element={<CreateProductPage/>}/>
                <Route path="product/:id/edit" element={<EditProductPage/>}/>"
              </Route>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
