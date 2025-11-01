import { Grid, Maximize, MessageSquare, Moon, Search, Settings } from "lucide-react"

const TopBar = ()=>{
    return(
        <header className="fixed top-0 left-64 right-0 flex items-center justify-between 
  px-6 py-3 bg-white border-b border-gray-200 shadow-sm z-50">
            <div className="flex items-center w-1/2 max-w-lg">
                <div className="flex items-center w-full border 
                border-gray-200 rounded-full px-4 py-2 bg-gray-50 hover:bg-white
                focus-within:ring-blue-500 transition">
                    <input
                    type="text"
                    placeholder="Search here..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                    <Search size={18} className="text-gray-500"/>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Moon size={18} className="text-gray-600"/>
                </button>
                <button className="relative p-2 rounded-full hover:bg-gray-100">
                    <MessageSquare size={18} className="text-gray-600"/>
                    <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] 
                    rounded-full w-3.5 h-3.5 flex items-center justify-center
                    font-medium">
                        1
                    </span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Maximize size={18} className="text-gray-600"/>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Grid size={18} className="text-gray-600"/>
                </button>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                    <img
                    src="https://remosnextjs.vercel.app/images/avatar/user-1.png"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                        <p className="text-sm font-semibold text-gray-800">Kristin Watson</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Settings size={18} className="text-gray-600"/>
                </button>
            </div>
        </header>
    )
}
export default TopBar;