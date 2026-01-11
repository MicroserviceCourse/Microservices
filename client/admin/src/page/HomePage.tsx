import { ArrowUp, ArrowDown, Plus, ListOrdered } from "lucide-react";
import StatCard from "../components/Home/StatCard";
import PerformanceChart from "../components/Home/PerformanceChart";
import ConversionChart from "../components/Home/ConversionChart";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="bg-orange-100 text-orange-700 px-4 py-3 rounded-lg text-sm">
        We regret to inform you that our server is currently experiencing technical difficulties.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<ListOrdered />}
          title="Total Orders"
          value="13,647"
          change="2.3%"
          positive
        />
        <StatCard icon="👤" title="New Leads" value="9,526" change="8.1%" positive />
        <StatCard icon="💼" title="Deals" value="976" change="0.3%" positive={false} />
        <StatCard
          icon="💰"
          title="Booked Revenue"
          value="$123.6k"
          change="10.6%"
          positive={false}
        />
      </div>

      {/* Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Performance</h3>
          <div className="flex gap-2 text-sm">
            <button className="px-3 py-1 rounded border border-slate-200">ALL</button>
            <button className="px-3 py-1 rounded border border-slate-200">1M</button>
            <button className="px-3 py-1 rounded border border-slate-200">6M</button>
            <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 border border-slate-200">
              1Y
            </button>
          </div>
        </div>
        <PerformanceChart />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Conversions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Conversions</h3>
          <div className="flex justify-center">
            <ConversionChart />
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p className="text-gray-500">This Week</p>
              <p className="font-semibold">23.5k</p>
            </div>
            <div>
              <p className="text-gray-500">Last Week</p>
              <p className="font-semibold">41.05k</p>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Sessions by Country</h3>
          <div className="flex justify-center">
            <ConversionChart />
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p className="text-gray-500">This Week</p>
              <p className="font-semibold">23.5k</p>
            </div>
            <div>
              <p className="text-gray-500">Last Week</p>
              <p className="font-semibold">41.05k</p>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Top Pages</h3>
            <button className="text-sm text-orange-500">View All</button>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ["larkon/ecommerce.html", "465"],
              ["larkon/dashboard.html", "426"],
              ["larkon/chat.html", "254"],
            ].map(([path, views]) => (
              <div key={path} className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-gray-600">{path}</span>
                <span className="font-medium">{views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Recent Orders</h3>
          <button className="flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1 rounded">
            <Plus size={14} /> Create Order
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Payment</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {["RB5625", "RB9652", "RB5984"].map((id) => (
                <tr key={id} className="border-b border-slate-200">
                  <td className="p-3 text-[#8486a7]">#{id}</td>
                  <td className="p-3">Customer Name</td>
                  <td className="p-3">Credit Card</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
