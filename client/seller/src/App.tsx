import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SellerLayout from "./components/SellerLayout"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CreateProductPage from "./pages/CreateProductPage"

function App() {
  return (
    <>
     <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/dashboard" element={<SellerLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="product" element={<ProductPage/>}/>
                <Route path="product/create" element={<CreateProductPage/>}/>
              </Route>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
