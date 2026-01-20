import { BsGrid3X3Gap } from 'react-icons/bs'
import { FiLogOut, FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { clearTokens, getTokens, isAccessExpired } from '../util/auth'
import { useState } from 'react'
import { useCart } from './Cart/cart-context'

const NavBar = () => {
  const tokens = getTokens()
  const { cartCount } = useCart()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = tokens && !isAccessExpired()
  const handleLogout = () => {
    clearTokens()
    setOpen(false)
    navigate('/login')
  }
  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-white ">
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
          <div className="relative">
            <FiShoppingBag />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <FiSearch />

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="hover:text-black/70"
              >
                <FiUser />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-md text-sm">
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 text-base">
              <Link to="/login" className="hover:text-black/70">
                Login
              </Link>
              <Link to="/register" className="hover:text-black/70">
                Register
              </Link>
            </div>
          )}

          <BsGrid3X3Gap />
        </div>
      </div>
    </header>
  )
}
export default NavBar
