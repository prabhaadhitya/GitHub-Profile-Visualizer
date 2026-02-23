import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-blue-500 font-semibold"
      : "text-slate-300 hover:text-blue-500";

  return (
    <header className='flex justify-between pt-15 pb-10 pl-20 pr-20 bg-[#0F172A]'>
      <Link to="/">
        <h1 className='text-3xl text-white'>Github Profile Visualizer</h1>
      </Link>        
      <ul className='flex space-x-6'>          
        <li className={`${active('/')} text-xl cursor-pointer`}>
          <Link to="/">Home</Link>
        </li>
        <li className={`${active('/repositories')} text-xl cursor-pointer`}>
          <Link to="/repositories">Repositories</Link>
        </li>
        <li className={`${active('/analysis')} text-xl cursor-pointer`}>
          <Link to="/analysis">Analysis</Link>
        </li>          
      </ul>
    </header>
  )
}

export default Navbar;
