import { useContext, useEffect } from 'react'

import { UserContainer } from '../context/UserContextProvider'

import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import RepoCard from '../components/RepoCard'
import NoRepoData from '../components/NoRepoData';
import NoRepositories from '../components/NoRepositories';

function Repositories() {
  const { repos, handleRepo, searchTerm, isLoading, profile } = useContext(UserContainer);
  
  useEffect(() => {
    handleRepo();
  }, [searchTerm, handleRepo]);

  if (!profile) return (
    <NoRepoData />
  )
    
  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-17">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6">
        {isLoading ? <Loader /> : repos.length === 0 ? <NoRepositories /> : 
          <div>
            <h1 className="text-3xl font-bold mb-8">Repositories</h1>
            <div className="space-y-6">
              {repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
            </div>
          </div>
        }
      </div>      
    </div>
  )
}

export default Repositories
