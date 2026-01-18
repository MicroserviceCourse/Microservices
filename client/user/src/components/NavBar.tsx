import { BsGrid3X3Gap } from 'react-icons/bs'
import {
  FiSearch,
  FiShoppingBag,
} from 'react-icons/fi'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
 <header className="fixed top-0 left-0 w-full z-20 bg-white ">
        <div className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">bazaar</h1>

          <ul className="flex gap-6 text-lg font-medium">
            <li><Link to="/">Home</Link></li>
            <li>Pages</li>
            <li>Shop</li>
            <li><Link to="/blog">Blog</Link></li>
            <li>Lookbook</li>
            <li>Elements</li>
          </ul>

          <div className="flex items-center gap-5 text-xl">
            <FiShoppingBag />
            <FiSearch />
            <div className='flex gap-3 text-base'>
             <Link to="/login" className="hover:text-black/70">
              Login
            </Link>
            <Link to="/register" className="hover:text-black/70">
              Register
            </Link>
            </div>
            <BsGrid3X3Gap />
          </div>
        </div>
      </header>
  )
}
export default NavBar;