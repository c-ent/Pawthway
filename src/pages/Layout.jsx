import { Outlet, Link } from "react-router-dom";
import { supabase } from '../supabaseClient';
import { useEffect, useState } from "react";

const Layout = () => {
  const [session, setSession] = useState(null);

  async function getSession() {
    const {data: { session },} = await supabase.auth.getSession()
    setSession(session);
  }

  getSession()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    window.location.reload();
  }

  return (
    <>
    <header className="flex items-center justify-between ">
      <nav>
        <ul className="flex text-sm md:text-md  space-x-2 md:space-x-10 items-center" >
          <li>
            <Link to="/" className="text-md md:text-lg font-extrabold  hover:text-purple-600 pr-5">Pawthway</Link>
          </li>
          <li className="hidden md:block">
            <Link to="/" className=" text-md  font-bold	 hover:text-purple-600">Home</Link>
          </li>
          <li>
            <Link to="/lostpets" className="text-md  font-bold	 hover:text-purple-600">Lost Pets</Link>
          </li>
          <li>
            <Link to="/foundpets" className="text-md    font-bold	 hover:text-purple-600">Found Pets</Link>
          </li>
          {!session && (
        <>
          <li>
            <Link to="/signup" className="text-md font-bold hover:text-purple-600">Sign Up</Link>
          </li>
          <li>
            <Link to="/login" className="text-md font-bold hover:text-purple-600">Login</Link>
          </li>
        </>
      )}
      {session && (
        <li>
          <button onClick={handleLogout} className="text-md font-bold hover:text-purple-600">Logout</button>
        </li>
      )}
        </ul>
      </nav>
      <div className="hidden md:block">
        <input type="search" placeholder="Search" className="px-3 py-1 rounded-full border  border-black" />
      </div>
    </header>
    <Outlet />
    </>
  );
};

export default Layout;