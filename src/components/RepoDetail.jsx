import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { UserContainer } from '../context/UserContextProvider'
import { ArrowLeft } from "lucide-react";
import Navbar from './Navbar';
import ContributerIcon from './ContributerIcon';
import Piechart from './DonutChart';
import images from '../assets/assets';
import Loader from './Loader';
import EmptyRepo from './EmptyRepo';

function RepoDetail() {

  const { isLoading, setIsLoading } = useContext(UserContainer)
  const { user, repoName } = useParams();
  const navigate = useNavigate();

  const [repo, setRepo] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [commitCount, setCommitCount] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [pieLang, setPieLang] = useState([]);

  const tagColors = [
    { text: "#E879F9", bg: "#C026D329" },
    { text: "#4ADE80", bg: "#22C55E29" },
    { text: "#38BDF8", bg: "#0284C729" },
    { text: "#F472B6", bg: "#DB277729" },
    { text: "#FBBF24", bg: "#F59E0B29" }
  ];

  const fetchAllDetails = async () => {
    try {
      setIsLoading(true)
      const repoRes = await fetch(`https://api.github.com/repos/${user}/${repoName}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      })
      const repoData = await repoRes.json();

      const contributorsRes = await fetch(`https://api.github.com/repos/${user}/${repoName}/contributors`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      })
      const contributorsData = await contributorsRes.json();

      const commitRes = await fetch(`https://api.github.com/repos/${user}/${repoName}/commits?per_page=1`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
        })

      const linkHeader = commitRes.headers.get("link");
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (match) {
          setCommitCount(parseInt(match[1]));
        }
      } else {
        setCommitCount(1);
      }  

      const langRes = await fetch(`https://api.github.com/repos/${user}/${repoName}/languages`, {
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      });
      const langData = await langRes.json();

      setRepo(repoData);
      setContributors(contributorsData)
      setLanguages(Object.keys(langData));
      setPieLang(langData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllDetails();
  }, [user, repoName])

  const visibleContributors = contributors.slice(0, 5);
  const remainingCount = contributors.length - 5;
  
  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#0f172a]'>
        <Loader />
      </div>
    )
  }

  if (!repo) return (
    <div className='min-h-screen bg-[#0f172a] text-white'>  
      <Navbar />    
      <EmptyRepo />
    </div>
  )
  
  return (
    <div className='min-h-screen bg-[#0f172a] text-white pb-20'>
      <Navbar />
      <button 
        onClick={() => navigate('/repositories')} 
        className="ml-50 mt-4 px-4 py-2 bg-[#111C33] rounded-lg border border-[#1f2a44] hover:bg-[#1e293b] transition"
      >
        <ArrowLeft size={25}/>
      </button>
      <div className="bg-[#1e293b] w-full max-w-285 mx-auto mt-10 p-10 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-400 mb-2">
          {repo.name}
        </h2>
        <p className="text-gray-400 text-md mb-6">
          {repo.description || "No description"}
        </p>        
        <div className="flex flex-wrap gap-3 mb-6">
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
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
          <img src={images.star_icon} className='h-4 w-4' /> {repo.stargazers_count}
          <img src={images.fork_icon} className='h-4 w-4' /> {repo.forks_count}
        </div>
        <div className='flex  p-2 mt-2'>
          <div className='h-17 w-40 border-[#CBD5E1] border p-2 text-center mr-2 rounded-sm'>
            <h3>Commits count</h3>
            <p>{commitCount}</p>
          </div>
          <div className='h-17 w-40 border-[#CBD5E1] border p-2 text-center rounded-sm '>
            <h3>Issues Count</h3>
            <p>{repo.open_issues_count}</p>
          </div>
        </div>
        <h3 className='p-2'>Contributors :</h3>
        <p className='text-[#CBD5E1] text-sm pl-2'> {contributors.length} Members </p>
        <div className="flex items-center p-2">
          {visibleContributors.map((person, index) => (
            <div key={person.id} className={`${index !== 0 ? "ml-3" : ""}`}>
              <ContributerIcon person={person} />
            </div>
          ))}

          {remainingCount > 0 && (
            <div className="ml-3 h-10 w-10 flex items-center justify-center 
                    rounded-full bg-[#0f172a] border-2 border-[#1e293b]
                    text-sm font-semibold text-gray-300">
              +{remainingCount}
            </div>
          )}
        </div>
        <h3>Languages: </h3>
        <Piechart pieLang={pieLang} />
      </div>
    </div>
  )
}

export default RepoDetail