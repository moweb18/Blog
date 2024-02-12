import { Link, useLocation } from "react-router-dom";
import logo from "/logo.png";
import { useRef, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [searchInputActive, setSearchInputActive] = useState(false);
  const searchInput = useRef(null);
  const [search, setSearch] = useState("");

  const menuItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/topics",
      label: "Topics",
    },
    {
      path: "/about",
      label: "About",
    },
  ];

  const activeOrNonActiveSearch = () => {
    if (!searchInputActive) {
      setSearchInputActive(true);
      searchInput.current.focus();
    } else {
      setSearchInputActive(false);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-slate-200 bg-white/70 p-5 backdrop-blur-lg backdrop-filter">
      <nav className="container mx-auto flex flex-col gap-4 lg:flex-row lg:justify-between">
        <ul className="flex items-center justify-center gap-8 lg:gap-5">
          {menuItems.map((menuItem) => {
            const { path, label } = menuItem;

            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`uppercase ${
                    location.pathname === path
                      ? "font-medium text-primary"
                      : "text-slate-800"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-center  justify-center gap-5 lg:flex-row">
          <div>
            <Link to={"/"} className="flex items-center justify-center gap-2">
              <img src={logo} alt="logo" width="50" height="50" />
              <span className="font-quicksand text-xl font-semibold text-primary">
                Modif Website
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-5 lg:ml-auto">
            <div className="flex items-center gap-5">
              <form method="post">
                <input
                  type="search"
                  className={`w-full rounded-full border border-slate-500 px-4 py-2 text-slate-700 outline-none placeholder:text-gray-300 lg:block lg:min-w-64 ${searchInputActive ? "block opacity-100" : "pointer-events-none hidden opacity-0"}`}
                  placeholder="Perbedaan HTML dan CSS pada Tampilan Website"
                  ref={searchInput}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              <button type="button" onClick={activeOrNonActiveSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill={`${searchInputActive ? "#2b95f6" : "rgba(151,151,151,1)"}`}
                >
                  <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
              </button>
            </div>

            <button type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="#2b95f6"
              >
                <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
