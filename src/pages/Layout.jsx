import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <header className="flex items-center justify-between ">
      <nav>
        <ul className="flex space-x-10 items-center" >
          <li>
            <Link to="/" className="text-lg font-extrabold  hover:text-purple-600 pr-5">Pawthway</Link>
          </li>
          <li>
            <Link to="/" className="text-md  font-bold	 hover:text-purple-600">Home</Link>
          </li>
          <li>
            <Link to="/lostpets" className="text-md  font-bold	 hover:text-purple-600">Lost Pets</Link>
          </li>
          <li>
            <Link to="/foundpets" className="text-md    font-bold	 hover:text-purple-600">Found Pets</Link>
          </li>
        </ul>
      </nav>
      <div>
        <input type="search" placeholder="Search" className="px-3 py-1 rounded-full border  border-black" />
      </div>
    </header>
    <Outlet />
    </>
  );
};

export default Layout;