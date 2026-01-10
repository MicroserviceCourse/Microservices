import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import ContactMap from '../components/contact/ContactMap'
import { FiSearch, FiShoppingBag } from 'react-icons/fi'
import { BsGrid3X3Gap } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const ContactPage = () => {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-20 bg-white space-y-5">
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
      <ContactMap />

      <section className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <ContactInfo />
        <ContactForm />
      </section>
    </>
  )
}
export default ContactPage
