import { useEffect, useState } from "react";
import { Link } from "react-router";

const RepoCard = ({ repo }) => {
  const { name, description, languages_url, owner } = repo;

  const tagColors = [
    { text: "#E879F9", bg: "#C026D329" },
    { text: "#4ADE80", bg: "#22C55E29" },
    { text: "#38BDF8", bg: "#0284C729" },
    { text: "#F472B6", bg: "#DB277729" },
    { text: "#FBBF24", bg: "#F59E0B29" }
  ];

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(languages_url,{
          headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
        });
        const data = await res.json();
        setLanguages(Object.keys(data));
      } catch (err) {
        console.error("Error fetching languages", err);
      }
    };
    fetchLanguages();
  }, [languages_url]);

  return (
    <Link to={`/repo/${owner.login}/${name}`}>
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md m-5">
        <h2 className="text-xl font-semibold text-blue-400 mb-2">
          {name}
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          {description || "No description"}
        </p>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang, index) => {
            const color = tagColors[index % tagColors.length];
            return (
              <span
                key={index}
                style={{
                  backgroundColor: color.bg,
                  color: color.text
                }}
                className="px-4 py-1.5 text-xs rounded-full font-medium"
              >
                {lang}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default RepoCard;