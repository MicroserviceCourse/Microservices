import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import PostDetail from './pages/PostDetail'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/ProductDetailPage'
import OAuth2Success from './pages/OAuth2SuccessPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<PostDetail />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="/oauth2/success" element={<OAuth2Success />} />
          <Route path='register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
