import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import CreateCategory from "./pages/category/CreateCategory"
import CategoryList from "./pages/category/CategoryList"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ModuleList from "./pages/module/ModuleList"
import PermissionList from "./pages/permission/PermissionList"
import RoleList from "./pages/Role/RoleList"
import BlogCategoryList from "./pages/blog/category/CategoryList";
import BlogCreateCategory from "./pages/blog/category/CreateCategory";
function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>

        {/* Trang dashboard với layout chính */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="createCategory" element={<CreateCategory />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="modules" element={<ModuleList/>}/>
          <Route path="roles" element={<RoleList/>}/>
          <Route path="modules/:id/permissions" element={<PermissionList/>}/>
          <Route path="blog/categories" element={<BlogCategoryList />} />
          <Route path="blog/categories/create" element={<BlogCreateCategory />}/>
          <Route path="blog/categories/:id/edit" element={<BlogCreateCategory />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
