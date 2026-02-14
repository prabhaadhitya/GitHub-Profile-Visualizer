import { useContext } from 'react'
import {Loader2} from 'lucide-react'
import { UserContainer } from '../context/UserContextProvider.jsx';

import Navbar from '../components/Navbar.jsx'
import ErrorView from '../components/ErrorView.jsx';
import LandingView from '../components/LandingView.jsx';
import ProfileView from '../components/ProfileView.jsx';

function Home() {
     
    const {searchTerm, setSearchTerm, handleInput, errorHandle, status, profile, errMsg ,isLoading} = useContext(UserContainer)    
    
    return (        
        <div className='min-h-screen bg-[#0F172A] text-white '>
            <Navbar />
            <form
                onSubmit={handleInput}
                className="flex justify-center items-center mt-15"
            >
                <input
                    type="text"
                    placeholder="Enter github username..."
                    className="w-96 h-12 bg-[#1D2537] p-3 "
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="size-6 text-[#FFFFFF] bg-[#4F4E4C] p-3 h-12 w-12 rounded-r-md cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" 
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
          </form>
          {!profile && <p className=' text-red-900 text-center mt-2'>{errMsg}</p>}
          {status === "idle" && <LandingView />}
          {isLoading && (
              <div className="flex justify-center items-center pt-40 ">
                  <Loader2 className='h-6 w-6 animate-spin text-blue-400'/>
              </div>
          )}
          {status === "error" && (
              <ErrorView
                  onRetry={errorHandle}
              />
          )}
          {status === "success" && <ProfileView profile={profile} />}      
      </div>
    )
}

export default Home