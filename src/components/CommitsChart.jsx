import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#0B1120] border border-[#1f2a44] px-3 py-2 rounded-lg shadow-lg">
      <p className="text-sm font-semibold text-blue-300">
        {label}
      </p>
      <p className="text-xs text-gray-300">
        {payload[0].value} contributions
      </p>
    </div>
  );
};

function CommitsChart({ chartData }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
        <XAxis dataKey="month" stroke="#8aa4ff" />
        <YAxis stroke="#8aa4ff" />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#5B8CFF", strokeWidth: 1 }}
        />

        <Line
          type="monotone"
          dataKey="contributions"
          stroke="#5B8CFF"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CommitsChart;