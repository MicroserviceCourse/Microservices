import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import { AlertProvider } from './alert-context/alert-context'

const Layout = () => {
  return (
    <>
      <AlertProvider>
        <div className="flex min-h-screen flex-col bg-gray-50">
          <NavBar />
          <main className="flex-1 relative">
            <Outlet />
          </main>
        </div>
      </AlertProvider>
    </>
  )
}
export default Layout
