import { Outlet } from "react-router-dom"
import SideBar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import { AlertProvider } from "../components/alert-context"

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#f9fafb]">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-9 pt-20 overflow-y-auto bg-[#f2f7fb]">
                    <AlertProvider>
                        <Outlet />
                    </AlertProvider>
                </main>
            </div>
        </div>
    )
}
export default MainLayout;