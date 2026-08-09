import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [linkMenu, setLinkMenu] = useState(false);
  const toggleMenu = () => {
    setLinkMenu((prev) => !prev)
  }
  
  const { currentUser, loading, logout } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="flex justify-between items-center bg-gray-500 px-4 py-3">
      <Link to='/' className="text-2xl font-bold"> React Movie App</Link>
      <div className="relative">
        <button onClick={toggleMenu} className=" text-2xl cursor-pointer">👤</button>
        {linkMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded shadow-lg p-2 flex flex-col gap-2 ">
            {currentUser ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <>
                <NavLink to='/register' className=' w-full text-left px-3 py-1 hover:bg-gray-300 rounded'>Register</NavLink>
                <NavLink to='/login' className=' w-full text-left px-3 py-1 hover:bg-gray-300 rounded'>Login</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}