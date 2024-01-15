import { Outlet, Link } from "react-router-dom";
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from "../components/SessionContext";


const NavItem = ({ to, children }) => (
  <li>
    <Link to={to} className="text-md font-bold hover:text-purple-600">{children}</Link>
  </li>
);


const Layout = () => {
  const session = useContext(SessionContext);

  const navItems = [
    { to: '/lostpets', name: 'Lost Pets' },
    { to: '/foundpets', name: 'Found Pets' },
    { to: '/signup', name: 'Sign Up', show: !session },
    { to: '/login', name: 'Login', show: !session },
    { to: '/profile', name: 'Profile', show: session },
  ];

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    window.location.reload();
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
   <header className="flex items-center justify-between relative">

    <Link to="/" className="text-md md:text-lg font-extrabold  hover:text-purple-600 md:pr-5">Pawthway</Link>


      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} absolute top-0 left-0 h-screen w-64 bg-white transition-transform duration-200 ease-in-out md:hidden z-50`}>
        <button onClick={() => setIsOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul>
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
            <>
              <li>
                <Link to="/profile" className="text-md font-bold hover:text-purple-600">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-md font-bold hover:text-purple-600">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>



      <nav>
        <ul className="flex text-sm md:text-md space-x-2 md:space-x-10 items-center">
        <li>
            <Link to="/lostpets" className="text-md  font-bold	 hover:text-purple-600">Lost Pets</Link>
          </li>
          <li>
            <Link to="/foundpets" className="text-md    font-bold	 hover:text-purple-600">Found Pets</Link>
          </li>

          <div className="hidden md:block">
         
          {!session && (
            <div className="flex text-sm md:text-md space-x-2 md:space-x-10 items-center">
              <li>
                <Link to="/signup" className="text-md font-bold hover:text-purple-600">Sign Up</Link>
              </li>
              <li>
                <Link to="/login" className="text-md font-bold hover:text-purple-600">Login</Link>
              </li>
            </div>
          )}
          {session && (
            <div className="flex text-sm md:text-md space-x-2 md:space-x-10 items-center">
              <li>
                <Link to="/profile" className="text-md font-bold hover:text-purple-600">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-md font-bold hover:text-purple-600">Logout</button>
              </li>
            </div>
          )}
          </div>
        </ul>
      </nav>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="hidden md:block">
        <input type="search" placeholder="Search" className="px-3 py-1 rounded-full border border-black" />
      </div>
    </header>
    <Outlet />
    </>
  );
};

export default Layout;

