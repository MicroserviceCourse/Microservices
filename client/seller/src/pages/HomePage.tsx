import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { ReportItemProps } from "../types";
import { FiRefreshCw } from "react-icons/fi";
import Button from "../components/ui/button/Button";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const chartData = [
  { name: "Jan", revenue: 4000, expense: 3000 },
  { name: "Feb", revenue: 3200, expense: 2000 },
  { name: "Mar", revenue: 2500, expense: 10000 },
  { name: "Apr", nue: 3600, expense: 4200 },
  { name: "May", revenue: 8300, expense: 4900 },
  { name: "Jun", revenue: 2900, expense: 7200 },
  { name: "Jul", revenue: 2400, expense: 4300 },
  { name: "Aug", revenue: 9000, expense: 4600 },
  { name: "Sep", revenue: 5200, expense: 10200 },
  { name: "Oct", revenue: 7000, expense: 1500 },
  { name: "Nov", revenue: 8200, expense: 3300 },
  { name: "Dec", revenue: 3700, expense: 4800 },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-4 py-6 bg-[#fff] rounded-xl shadow">
        <h1 className="text-4xl font-bold text-[#00224F]">Sales Analytics</h1>
        <div className="flex justify-center items-center font-semibold gap-4">
          <button className="flex justify-center items-center text gap-2">
            Data Refresh
            <FiRefreshCw />
          </button>
          <div>
            {/* hieenr thi ngay thang */}
            <div className="border-2 rounded-lg px-8 py-2">January 10, 2026 15:01 PM</div>
          </div>
        </div>
      </div>
      {/* ======================= TOP CARDS ======================= */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT BIG CARD */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6 flex items-center">
          <div className="w-32 h-32 border-1 bg-[#f9f9f9] rounded-xl flex flex-col justify-center items-center mr-6">
            <img
              src="https://shop-point.merku.love/assets/logo_light-33bb10d5.svg"
              className="w-16"
            />
            <p className="mt-3 font-semibold text-gray-700">ShopPoint</p>
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-[#00224F]">ShopPoint - Retail</h2>
            <p className="text-gray-500 text-md font-semibold">
              Aliquam erat volutpat. Duis molestie ultrices tempus. Mauris sem orci, euismod sit
              amet.
            </p>

            <div className="flex items-center gap-4 mt-3 text-gray-600">
              <span className="text-xl font-semibold text-black">Average Rate 2023</span>
              <div className="bg-blue-700 px-2 text-sm font-extrabold text-white rounded-full">
                i
              </div>
            </div>

            <div className="flex items-center gap-10 mt-4">
              <StatItem
                icon="https://cdn-icons-png.flaticon.com/512/2769/2769794.png"
                value="$15,412"
                label="Income"
                growth="▲ +45.21%"
                color="text-green-500"
              />
              <StatItem
                icon="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                value="$53,487"
                label="Expense"
                growth="▼ -12%"
                color="text-red-500"
              />
              <StatItem
                icon="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                value="5,412"
                label="New Orders"
                growth="▲ +14.36%"
                color="text-green-500"
              />
            </div>
          </div>
        </div>

        {/* RIGHT TOTAL BALANCE CARD */}
        <div className="bg-[#dceaf9] rounded-xl shadow-xl p-6 flex justify-between">
          <img
            src="https://shop-point.merku.love/assets/balance-c2e80db3.webp"
            className="w-xs rounded-xl object-cover"
          />
          <div className="mt-4 flex flex-col items-start justify-center font-extrabold text-3xl">
            <p className="text-[#00224F]">$476,3k</p>
            <p className="font-semibold text-sm">Total Balance</p>
          </div>
        </div>
      </div>

      {/* ======================= SALES STATISTICS SECTION ======================= */}
      <div className="grid grid-cols-3 gap-6">
        {/* CHART LEFT */}
        <div className="col-span-2 bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-[#00224F] mb-4">Sales Statistic 2022</h2>

          <div className="flex items-center gap-6 mb-4">
            <LegendDot color="#0D1A4B" label="Revenue" />
            <LegendDot color="#D1D5DB" label="Expense" />
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis
                  stroke="#888"
                  tickCount={5}
                  tickFormatter={(value) => (value >= 1000 ? `$${value / 1000}k` : value)}
                />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0D1A4B" barSize={16} radius={[16, 16, 16, 16]} />
                <Bar dataKey="expense" fill="#D1D5DB" barSize={16} radius={[16, 16, 16, 16]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOTAL REPORT RIGHT */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-[#00224F] mb-1">Total Report</h2>
          <p className="text-gray-500 text-md mb-4">All periods per 01/01/2022 – 08/28/2023</p>

          <div className="space-y-4">
            <ReportItem
              icon="https://shop-point.merku.love/assets/coins-c4361fe1.webp"
              label="Revenue"
              amount="$176,120"
              growth="+45%"
              color="text-green-500"
              arrowIcon={<BiSolidUpArrow className="text-green-500" />}
            />
            <ReportItem
              icon="data:image/webp;base64,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"
              label="Expense"
              amount="$310,452"
              growth="-12%"
              color="text-red-500"
              arrowIcon={<BiSolidDownArrow className="text-red-500" />}
            />
            <ReportItem
              icon="data:image/webp;base64,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"
              label="Profit"
              amount="$342,558"
              growth="+14.56%"
              color="text-green-500"
              arrowIcon={<BiSolidUpArrow className="text-green-500" />}
            />
          </div>
          <div className="mt-4">
            <Button variant="primary" size="full" rounded="full">
              More Details
            </Button>
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

function ReportItem({ icon, label, amount, growth, color, arrowIcon }: ReportItemProps) {
  return (
    <div className="flex items-center justify-between border border-[#F1F1F1] bg-[#F9F9F9] rounded-lg p-4 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <img src={icon} className="w-10" />
        <span className="font-medium text-[#00224F]">{label}</span>
      </div>

      <div className="text-right flex justify-between items-center gap-2">
        <p className="font-semibold">{amount}</p>
        {arrowIcon}
        <p className={`text-sm font-medium ${color}`}>{growth}</p>
      </div>
    </div>
  );
}
