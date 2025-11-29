import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SellerLayout from "./components/SellerLayout"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <>
     <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/dashboard" element={<SellerLayout/>}>
                <Route index element={<HomePage/>}/>
              </Route>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
