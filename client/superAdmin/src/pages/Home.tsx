import { ArrowDownRight, ArrowUpRight, DollarSign, FileText, ShoppingBag, Users } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";


const salesData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
    { name: "Jul", value: 4800 },
    { name: "Aug", value: 6200 },
    { name: "Sep", value: 5300 },
    { name: "Oct", value: 5800 },
    { name: "Nov", value: 4900 },
    { name: "Dec", value: 5100 },
]
const earningData = [
    { name: "Jan", revenue: 4000, profit: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398 },
    { name: "Mar", revenue: 2000, profit: 9800 },
    { name: "Apr", revenue: 2780, profit: 3908 },
    { name: "May", revenue: 1890, profit: 4800 },
    { name: "Jun", revenue: 2390, profit: 3800 },
    { name: "Jul", revenue: 3490, profit: 4300 },
]
const Home = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    {
                        title: "Total Sales",
                        value: "34,945",
                        percent: "1.56%",
                        color: "bg-green-100",
                        icon: <ShoppingBag className="text-green-600" size={22} />,
                        positive: true,
                    },
                    {
                        title: "Total Income",
                        value: "$37,802",
                        percent: "1.56%",
                        color: "bg-orange-100",
                        icon: <DollarSign className="text-orange-500" size={22} />,
                        positive: false,
                    },
                    {
                        title: "Orders Paid",
                        value: "34,945",
                        percent: "0.00%",
                        color: "bg-gray-100",
                        icon: <FileText className="text-gray-500" size={22} />,
                        positive: true,
                    },
                    {
                        title: "Total Visitor",
                        value: "34,945",
                        percent: "1.56%",
                        color: "bg-blue-100",
                        icon: <Users className="text-blue-500" size={22} />,
                        positive: true,
                    },
                ].map((card, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex justify-between items-center">
                            <div className={`p-2 rounded-lg ${card.color}`}>{card.icon}</div>
                            <span
                                className={`flex items-center text-sm font-medium ${card.positive ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {card.positive ? (
                                    <ArrowUpRight size={14} />
                                ) : (
                                    <ArrowDownRight size={14} />
                                )}
                                {card.percent}
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">{card.title}</p>
                        <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                        <div className="mt-2">
                            <ResponsiveContainer width="100%" height={40}>
                                <LineChart data={salesData}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={card.positive ? "#22c55e" : "#f97316"}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Recent Order
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#2563eb"
                                strokeWidth={3}
                                fillOpacity={0.2}
                                fill="url(#colorBlue)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            View All
                        </a>
                    </div>
                    <ul className="space-y-4">
                        {["Patimax Fragrance", "Nulo MedalSeries", "Pedigree Puppy", "Biscoito Premier", "Pedigree Adult"].map(
                            (product, i) => (
                                <li key={i} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={`https://via.placeholder.com/40x40?text=${i + 1}`}
                                            alt={product}
                                            className="w-10 h-10 rounded-lg"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800">{product}</p>
                                            <p className="text-sm text-gray-400">100 Items</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">Coupon Code</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Earnings</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={earningData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#22c55e" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        New Comments
                    </h3>
                    <ul className="space-y-4">
                        {[
                            {
                                name: "Kathryn Murphy",
                                comment:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            },
                            {
                                name: "Leslie Alexander",
                                comment:
                                    "Cras nec viverra justo, a mattis lacus. Vestibulum eleifend.",
                            },
                            {
                                name: "Devon Lane",
                                comment:
                                    "Morbi eget commodo diam. Praesent dignissim purus ac turpis porta.",
                            },
                        ].map((user, i) => (
                            <li key={i} className="flex space-x-3">
                                <img
                                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.comment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Home;