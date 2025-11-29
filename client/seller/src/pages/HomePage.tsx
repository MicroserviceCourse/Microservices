import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { ReportItemProps } from "../types";

const chartData = [
  { name: "Jan", revenue: 4000, expense: 3000 },
  { name: "Feb", revenue: 3200, expense: 2000 },
  { name: "Mar", revenue: 2500, expense: 10000 },
  { name: "Apr", revenue: 3600, expense: 4200 },
  { name: "May", revenue: 8300, expense: 4900 },
  { name: "Jun", revenue: 2900, expense: 7200 },
  { name: "Jul", revenue: 2400, expense: 4300 },
  { name: "Aug", revenue: 9000, expense: 4600 },
  { name: "Sep", revenue: 5200, expense: 10200 },
  { name: "Oct", revenue: 7000, expense: 1500 },
  { name: "Nov", revenue: 8200, expense: 3300 },
  { name: "Dec", revenue: 3700, expense: 4800 }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#00224F]">Sales Analytics</h1>

      {/* ======================= TOP CARDS ======================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT BIG CARD */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6 flex items-center">
          <div className="w-32 h-32 border rounded-xl flex flex-col justify-center items-center mr-6">
            <img src="https://shop-point.merku.love/assets/logo-b0773cd1.svg" className="w-16" />
            <p className="mt-3 font-semibold text-gray-700">ShopPoint</p>
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-[#00224F]">ShopPoint - Retail</h2>
            <p className="text-gray-500">Aliquam erat volutpat. Duis molestie ultrices tempus. Mauris sem orci, euismod sit amet.</p>

            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <span className="font-semibold">Average Rate 2023</span>
              <span className="text-blue-500 cursor-pointer">ℹ</span>
            </div>

            <div className="flex items-center gap-10 mt-4">
              <StatItem icon="https://cdn-icons-png.flaticon.com/512/2769/2769794.png" value="$15,412" label="Income" growth="▲ +45.21%" color="text-green-500" />
              <StatItem icon="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" value="$53,487" label="Expense" growth="▼ -12%" color="text-red-500" />
              <StatItem icon="https://cdn-icons-png.flaticon.com/512/891/891462.png" value="5,412" label="New Orders" growth="▲ +14.36%" color="text-green-500" />
            </div>
          </div>
        </div>

        {/* RIGHT TOTAL BALANCE CARD */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
          <img src="https://shop-point.merku.love/assets/money-0f91b8bc.webp" className="w-full rounded-xl" />
          <div className="mt-4">
            <p className="text-3xl font-bold text-[#00224F]">$476,3k</p>
            <p className="text-gray-600 text-sm">Total Balance</p>
          </div>
        </div>
      </div>

      {/* ======================= SALES STATISTICS SECTION ======================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* CHART LEFT */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-[#00224F] mb-4">Sales Statistic 2022</h2>

          <div className="flex items-center gap-6 mb-4">
            <LegendDot color="#0D1A4B" label="Revenue" />
            <LegendDot color="#D1D5DB" label="Expense" />
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0D1A4B" radius={[4,4,0,0]} />
                <Bar dataKey="expense" fill="#D1D5DB" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOTAL REPORT RIGHT */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-[#00224F] mb-1">Total Report</h2>
          <p className="text-gray-500 text-sm mb-4">All periods per 01/01/2022 – 08/28/2023</p>

          <div className="space-y-4">
            <ReportItem icon="https://cdn-icons-png.flaticon.com/512/1170/1170576.png" label="Revenue" amount="$176,120" growth="+45%" color="text-green-500" />
            <ReportItem icon="https://cdn-icons-png.flaticon.com/512/1907/1907781.png" label="Expense" amount="$310,452" growth="-12%" color="text-red-500" />
            <ReportItem icon="https://cdn-icons-png.flaticon.com/512/1330/1330216.png" label="Profit" amount="$342,558" growth="+14.56%" color="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================= COMPONENTS ======================= */
function StatItem({ icon, value, label, growth, color }: any) {
  return (
    <div>
      <div className={`flex items-center gap-2 text-xl font-bold ${color}`}>        
        <img src={icon} className="w-6" /> {value}
      </div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`${color} font-medium text-sm mt-1`}>{growth}</p>
    </div>
  );
}

function LegendDot({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}

function ReportItem({ icon, label, amount, growth, color }: ReportItemProps) {
  return (
    <div className="flex items-center justify-between border border-[#F1F1F1] bg-[#F9F9F9] rounded-lg p-3 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <img src={icon} className="w-10" />
        <span className="font-medium text-[#00224F]">{label}</span>
      </div>

      <div className="text-right">
        <p className="font-semibold">{amount}</p>
        <p className={`text-sm font-medium ${color}`}>{growth}</p>
      </div>
    </div>
  );
}
