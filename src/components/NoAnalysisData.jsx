import { useContext } from 'react'
import { UserContainer } from '../context/UserContextProvider'
import images from '../assets/assets'
import Navbar from './Navbar'

function NoAnalysisData() {
  const { profile, handleHome } = useContext(UserContainer)

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Navbar />

      {!profile && (
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="flex flex-col items-center text-center max-w-xl">
            <img
              src={images.no_data_found}
              alt="No data"
              className="w-72 md:w-80 opacity-90 mb-8"
            />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              No Data Found
            </h2>           
            <p className="text-gray-400 mb-8 leading-relaxed">
              GitHub username is empty. Please provide a valid username
              to view analysis.
            </p>            
            <button
              onClick={handleHome}
              className="bg-blue-500 hover:bg-blue-600 active:scale-95
                         transition px-8 py-2.5 rounded-md font-medium
                         shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoAnalysisData