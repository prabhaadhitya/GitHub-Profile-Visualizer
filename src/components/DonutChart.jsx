import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#4ADE80",
  "#38BDF8",
  "#FBBF24",
  "#FB7185",
  "#A78BFA",
];

function DonutChart({pieLang}) {

  const data = Object.entries(pieLang).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="flex items-center gap-12 mt-6">
      <div className="w-80 h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={90}
              outerRadius={120}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-gray-300 text-sm">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;