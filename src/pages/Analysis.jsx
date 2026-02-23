import { useContext, useEffect, useState } from "react";
import { UserContainer } from "../context/UserContextProvider";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import CommitsChart from "../components/CommitsChart";
import NoAnalysisData from "../components/NoAnalysisData";
import ContributionHeatmap from "../components/ContributionHeatmap";

const USER_QUERY = `
  query($login:String!) {
    user(login:$login) {
      createdAt
    }
  }
`;

const CONTRIBUTIONS_QUERY = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login:$login) {
      contributionsCollection(from:$from, to:$to) {
        contributionCalendar {
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

function Analysis() {
  const { profile, isLoading, setIsLoading } = useContext(UserContainer);

  const [chartData, setChartData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const fetchGraphQL = async (query, variables) => {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLifetimeContributions = async () => {
    try {
      setIsLoading(true)
      const userData = await fetchGraphQL(USER_QUERY, {
        login: profile.login,
      });

      const startYear = new Date(userData.user.createdAt).getFullYear();
      const currentYear = new Date().getFullYear();

      let allDays = [];

      for (let year = startYear; year <= currentYear; year++) {
        const from = `${year}-01-01T00:00:00Z`;
        const to = `${year}-12-31T23:59:59Z`;

        const contribData = await fetchGraphQL(CONTRIBUTIONS_QUERY, {
          login: profile.login,
          from,
          to,
        });

        const weeks =
          contribData?.user?.contributionsCollection
            ?.contributionCalendar?.weeks || [];

        weeks.forEach((week) => {
          week.contributionDays.forEach((day) => {
            allDays.push(day);
          });
        });
      }

      const monthly = groupByMonth(allDays);
      setChartData(monthly);
    } catch (err) {
      console.error("Error fetching lifetime contributions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const groupByMonth = (days) => {
    const monthMap = {};

    days.forEach((day) => {
      const date = new Date(day.date);
      const year = date.getFullYear();
      const monthIndex = date.getMonth();

      const key = `${year}-${monthIndex}`;

      if (!monthMap[key]) {
        monthMap[key] = {
          date: new Date(year, monthIndex, 1),
          contributions: 0,
        };
      }

      monthMap[key].contributions += day.contributionCount;
    });

    return Object.values(monthMap)
      .sort((a, b) => a.date - b.date)
      .map((item) => ({
        month: item.date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        contributions: item.contributions,
      }));
  };

  useEffect(() => {
    if (profile?.login) {
      setIsLoading(true);
      fetchLifetimeContributions();
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        <Loader />
      </div>      
    );
  }

  if (!profile) return (
    <NoAnalysisData />
  )

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-17">
      <Navbar />
      <div className="text-white p-8 w-full max-w-285 mx-auto ">
        <h1 className="text-2xl font-semibold mb-6 pl-10">
          Analysis
        </h1>

        <div className="p-6">
          {chartData.length === 0 ? (
            <p className="text-gray-400">
              No contribution data available.
            </p>
          ) : (
            <>
              <div className="bg-[#111C33] p-6 rounded-2xl">
              <CommitsChart chartData={chartData} setSelectedPoint={setSelectedPoint} />
              {selectedPoint && (
                <div className="mt-6 bg-[#0B1120] p-4 rounded-xl border border-[#1f2a44]">
                  <p className="text-xl font-semibold text-blue-300">
                    {selectedPoint.month}
                  </p>
                  <p className="text-gray-300">
                    {selectedPoint.contributions} contributions
                  </p>
                </div>
              )}
              </div>
              <h1 className="text-2xl font-semibold mb-6 pt-6  pl-10">
                Commit History
              </h1>
              <div className="bg-[#111C33] p-6 rounded-2xl mt-3">                
                <ContributionHeatmap username={profile.login} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>    
  );
}

export default Analysis;