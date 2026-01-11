import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", views: 35, clicks: 8 },
  { month: "Feb", views: 65, clicks: 12 },
  { month: "Mar", views: 45, clicks: 9 },
  { month: "Apr", views: 70, clicks: 15 },
  { month: "May", views: 50, clicks: 20 },
  { month: "Jun", views: 60, clicks: 10 },
  { month: "Jul", views: 42, clicks: 5 },
  { month: "Aug", views: 44, clicks: 8 },
  { month: "Sep", views: 78, clicks: 6 },
  { month: "Oct", views: 52, clicks: 28 },
  { month: "Nov", views: 62, clicks: 14 },
  { month: "Dec", views: 68, clicks: 32 },
];

const PerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="views" fill="#ff7a45" radius={[4, 4, 0, 0]} />
        <Line type="monotone" dataKey="clicks" stroke="#22c55e" strokeWidth={2} dot={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default PerformanceChart;
