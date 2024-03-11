import { Outlet, Link ,useLocation} from "react-router-dom";
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from "../components/SessionContext";
import usericon  from '../../images/icons/user.svg';

const Layout = () => {
  const session = useContext(SessionContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { pathname } = useLocation();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    window.location.reload();
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden ">
   <header className="bg-transparent max-w-screen-2xl m-auto w-full flex items-center justify-between relative   p-4 md:p-5">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-md md:text-lg font-extrabold  hover:text-purple-600 md:pr-5">pawthway</Link>
        </div>
        

      {/* Nav items */}

      {/* Nav Links Static */}
     
      {/* Nav Links Dynamic */}
      <nav className="flex-1 justify-end hidden md:flex">
        <div className="flex text-sm md:text-md space-x-2 md:space-x-10 items-center">
        <nav className="md:flex-1 flex-2 flex justify-center ">
         <ul className="flex text-sm md:text-md space-x-2 md:space-x-3 items-center">
         <div>
            <Link 
              to="/lostpets" 
            >
              <button className={`w-[110px] border-[#1D1D1F] border-2  bg-[#1D1D1F] text-white py-[4px]  rounded-full text-md font-bold hover:text-purple-600 ${pathname === '/lostpets' ? 'text-violet-600' : ''}`}>
              Lost Pets
              </button>
              
            </Link>
          </div>
          <div>
            <Link 
              to="/foundpets" 
              className={` `}
            >
              <button className={` w-[110px] border-[#1D1D1F] border-2 py-[4px]   rounded-full text-md font-bold hover:text-purple-600 ${pathname === '/foundpets' ? 'text-violet-600' : ''}`}>
              Found Pets
              </button>
                
            </Link>
          </div>
          </ul>
      </nav>

          {/* Nav Links for  User Dropdown */}
          <div className="hidden md:block">
            <div className="flex">
              <img src={usericon} onClick={() => setToggleDropdown(!toggleDropdown)} alt="usericon" className="h-6 w-6"/>
              {toggleDropdown && (
                <div className="dropdown">
                  <div className="flex text-sm md:text-md space-x-2 md:space-x-10 items-center">
                    {session ? (
                      <>
                        <div>
                          <Link to="/profile" className="text-md font-bold hover:text-purple-600">Profile</Link>
                        </div>
                        <div>
                          <button onClick={handleLogout} className="text-md font-bold hover:text-purple-600">Logout</button>
                        </div>
                      </>
                    ) : (
                      !session && (
                        <div className="flex text-sm md:text-md space-x-2 md:space-x-10 items-center">
                          <div>
                            <Link to="/signup" className="text-md font-bold hover:text-purple-600">Sign Up</Link>
                          </div>
                          <div>
                            <Link to="/login" className="text-md font-bold hover:text-purple-600">Login</Link>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Button NavBar (Mobile) */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex-1 flex justify-end" aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* This is the div for the navbar that opens on mobile  */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 p-4 h-screen w-64 bg-white transition-transform duration-200 ease-in-out md:hidden z-50`}>
          <button onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            {!session && (
              <>
                <div>
                  <Link to="/signup" className="text-md font-bold hover:text-purple-600">Sign Up</Link>
                </div>
                <div>
                  <Link to="/login" className="text-md font-bold hover:text-purple-600">Login</Link>
                </div>
              </>
            )}
            {session && (
              <>
                <div>
                  <Link to="/profile" className="text-md font-bold hover:text-purple-600">Profile</Link>
                </div>
                <div>
                  <button onClick={handleLogout} className="text-md font-bold hover:text-purple-600">Logout</button>
                </div>
              </>
            )}
          </div>
        </div>

    </header>


    <main className="flex-grow overflow-hidden">
    <Outlet />
     </main>


    <footer className="bg-[#1D1D1F] text-white py-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">pawthway</h2>
        <p className="mb-6">Your go-to hub for heartwarming pet reunions.</p>
        <p className="mt-6 text-sm text-gray-300">© {new Date().getFullYear()} PawPathway. All rights reserved.</p>
      </div>
    </footer>

    </div>
  );
};

export default Layout;

