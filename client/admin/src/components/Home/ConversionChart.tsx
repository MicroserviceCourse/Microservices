import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Returning", value: 65.2 },
  { name: "New", value: 34.8 },
];

const COLORS = ["#ff7a45", "#e5e7eb"];
const ConversionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie data={data} innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value">
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default ConversionChart;
