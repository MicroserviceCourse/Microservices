import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import CreateCategory from "./pages/category/CreateCategory"
import CategoryList from "./pages/category/CategoryList"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/createCategory" element={<CreateCategory/>}/>
            <Route path="category" element={<CategoryList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
