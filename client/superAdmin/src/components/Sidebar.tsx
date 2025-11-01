import { useState } from "react";
import { ChevronDown, ChevronRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { SideBarItems } from "../data/SidebarItems";

const SideBar = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (index: string) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    return (
        <aside className="w-64 h-screen p-4 bg-white shadow-[0_0_24px_2px_rgba(20,25,38,0.05)] border-r border-[#f2f7fb] overflow-y-auto">
            <div className="overflow-y-auto">
                <div className="flex items-center justify-between mb-6 border-b border-[#f2f7fb] pb-2">
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://remosnextjs.vercel.app/images/logo/logo.png"
                            alt="Remos Logo"
                            className="h-8 w-auto object-contain"
                        />
                        <span className="text-lg font-semibold text-gray-800">Remos</span>
                    </div>
                </div>

                <nav className="space-y-6">
                    {SideBarItems.map((section, i) => (
                        <div key={i}>
                            <p className="text-gray-400 text-xs font-semibold mb-2 uppercase">
                                {section.title}
                            </p>
                            <ul className="space-y-1">
                                {section.items.map((item, j) => {
                                    const id = `${i}-${j}`;
                                    const isOpen = openMenu === id;
                                    return (
                                        <li key={j}>
                                            <div
                                                onClick={() => toggleMenu(id)}
                                                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${isOpen
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "hover:bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <item.icon
                                                        size={16}
                                                        className={`${isOpen ? "text-blue-600" : "text-gray-600"}`}
                                                    />
                                                    <span
                                                        className={`text-sm font-bold ${isOpen ? "text-blue-600" : "text-gray-700"
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                                {isOpen ? (
                                                    <ChevronDown size={14} className="text-blue-600" />
                                                ) : (
                                                    <ChevronRight size={14} className="text-gray-500" />
                                                )}
                                            </div>

                                            {isOpen && (
                                                <ul className="pl-8 space-y-1 mt-1 animate-fadeIn">
                                                    {item.children?.map((child, k) => (
                                                        <li
                                                            key={k}
                                                            className="flex items-center text-[15px] text-[#4b5563] py-1.5 px-2.5 hover:text-blue-600 cursor-pointer transition-all duration-150"
                                                            style={{
                                                                fontWeight: 500,
                                                                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                                                letterSpacing: '0.2px',
                                                                lineHeight: '1.6',
                                                            }}
                                                        >
                                                            <span className="w-2 h-2 border border-slate-300 rotate-45 mr-2" />
                                                            <span className="tracking-wide">{child}</span>
                                                        </li>

                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
            <div className="mt-8 border-t border-[#f2f7fb] pt-6">
                    <p className="text-gray-400 text-xs font-semibold mb-3 uppercase">Connect Us</p>
                    <div className="flex items-center gap-3 mb-6">
                        <button className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            <Facebook size={18}/>
                        </button>
                        <button className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            <Twitter size={18}/>
                        </button>
                        <button className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            <Linkedin size={18}/>
                        </button>
                        <button className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                            <Instagram size={18}/>
                        </button>
                    </div>
                    <div className="border border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition">
                        <img
                        src="https://remosnextjs.vercel.app/images/menu-left/img-bot.png"
                        alt="Support Avatar"
                        className="mx-auto mb-2 w-24 h-24 object-contain"
                        />
                        <h3 className="text-[17px] font-bold text-gray-700">
                            Hi, how can we help?
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">
                        Contact us if you have any assistance, we will contact you as soon as possible.
                        </p>
                        <button className="w-full bg-blue-600 hover:text-blue-700 text-white rounded-lg py-2 font-semibold transition">
                            Contact
                        </button>
                    </div>
            </div>
        </aside>
    );
};

export default SideBar;
