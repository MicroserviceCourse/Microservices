import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from "./pages/BlogPage";
import PostDetail from './pages/PostDetail';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<PostDetail />} />
      <Route path='/product' element={<ProductPage/>}/>
      <Route path='/about-us' element={<AboutPage/>}/>
    </Routes>
    </>
  )
}

export default App
