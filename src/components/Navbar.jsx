import { Link } from "react-router-dom";

function Navbar() {

  return (
    <header className='flex justify-between pt-15 pb-10 pl-20 pr-20 bg-[#0F172A]'>
      <Link to="/">
        <h1 className='text-3xl text-white'>Github Profile Visualizer</h1>
      </Link>        
        <div className='flex gap-5'>
          <Link to="/">
            <p className='text-xl text-white hover:text-[#3B82F6] cursor-pointer'>Home</p>
          </Link>
          <Link to="/repositories">
            <p className='text-xl text-white hover:text-[#3B82F6] cursor-pointer'>Repositories</p>
          </Link>
          <Link to="/analysis">
            <p className='text-xl text-white hover:text-[#3B82F6] cursor-pointer'>Analysis</p>
          </Link>
        </div>
    </header>
  )
}

export default Navbar;
