import { FiSearch, FiShoppingBag } from 'react-icons/fi'
import { BsGrid3X3Gap } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import AboutHero from '../components/aboutUs/AboutHero'
import AboutFeatures from '../components/aboutUs/AboutFeatures'
import AboutSkills from '../components/aboutUs/AboutSkills'
import TestimonialSection from '../components/aboutUs/TestimonialSection'

const AboutPage = () => {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-20 bg-white">
        <div className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">bazaar</h1>

          <ul className="flex gap-6 text-lg font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Pages</li>
            <li>Shop</li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>Lookbook</li>
            <li>Elements</li>
          </ul>

          <div className="flex items-center gap-5 text-xl">
            <FiShoppingBag />
            <FiSearch />
            <BsGrid3X3Gap />
          </div>
        </div>
      </header>
      <AboutHero />
      <AboutFeatures />
      <AboutSkills/>
      <TestimonialSection/>
    </>
  )
}
export default AboutPage
