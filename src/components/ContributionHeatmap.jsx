import { useEffect, useState } from "react";

const QUERY = `
query($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login:$login) {
    contributionsCollection(from:$from, to:$to) {
      contributionCalendar {
        months {
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

const getColor = (count) => {
  if (count === 0) return "#1f2a44";
  if (count < 3) return "#1e40af";
  if (count < 6) return "#2563eb";
  if (count < 10) return "#60a5fa";
  return "#bfdbfe";
};

function ContributionHeatmap({ username }) {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [weeks, setWeeks] = useState([]);
  const [months, setMonths] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  const fetchHeatmap = async (selectedYear) => {
    const from = `${selectedYear}-01-01T00:00:00Z`;
    const to = `${selectedYear}-12-31T23:59:59Z`;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: username, from, to },
      }),
    });

    const data = await res.json();

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar || {};

    setWeeks(calendar.weeks || []);
    setMonths(calendar.months || []);
  };

  useEffect(() => {
    fetchHeatmap(year);
  }, [username, year]);

  return (
    <div className="relative text-gray-300">

      {/* YEAR SELECTOR */}
      <div className="mb-4">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#0B1120] border border-[#1f2a44] px-3 py-1 rounded"
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const y = currentYear - i;
            return <option key={y}>{y}</option>;
          })}
        </select>
      </div>

      {/* MONTH LABELS */}
      <div className="flex ml-10 mb-2 text-xs">
        {months.map((m, i) => (
          <div key={i} style={{ width: m.totalWeeks * 16 }} className="text-center">
            {m.name}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* DAY LABELS */}
        <div className="flex flex-col gap-1 mr-2 text-gray-500 text-xs">
          <span>Mon</span>
          <span className="mt-3">Wed</span>
          <span className="mt-3">Fri</span>
        </div>

        {/* HEATMAP GRID */}
        <div className="flex gap-1">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    setTooltip({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                      date: day.date,
                      count: day.contributionCount,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    width: 14,
                    height: 14,
                    background: getColor(day.contributionCount),
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* TOOLTIP */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y,
            left: tooltip.x,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
          className="bg-[#111C33] px-3 py-2 rounded shadow-lg text-xs whitespace-nowrap"
        >
          <p className="font-semibold">
            {new Date(tooltip.date).toDateString()}
          </p>
          <p className="text-blue-300">
            {tooltip.count} contributions
          </p>
        </div>
      )}
    </div>
  );
}

export default ContributionHeatmap;