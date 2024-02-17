import { Link, useLocation } from "react-router-dom";
import logo from "/logo.png";
import { useEffect, useRef, useState } from "react";
import { URL_API } from "/src/utils.js";

const Header = () => {
  const location = useLocation();
  const [searchInputActive, setSearchInputActive] = useState(false);
  const searchInput = useRef(null);
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isVisibleTheme, setIsVisibleTheme] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    const placeholder = async () => {
      const request = await fetch(`${URL_API}/search_placeholder`, {
        method: "POST",
      });
      const response = await request.json();
      const { placeholder } = response;
      setPlaceholder(placeholder);
    };

    placeholder();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark", "bg-neutral-900");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light" || !theme) {
      document.body.classList.remove("dark", "bg-neutral-900");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleBodyClick = (event) => {
      const checkbox = document.getElementById("checkbox");
      if (!checkbox.contains(event.target) && isVisibleTheme) {
        setIsVisibleTheme(false);
        return;
      }
    };

    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [isVisibleTheme]);

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

  const showHidePopupTheme = () => {
    if (!isVisibleTheme) {
      setIsVisibleTheme(true);
    } else {
      setIsVisibleTheme(false);
    }
  };

  const changeTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    setIsVisibleTheme(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-slate-200 bg-white/70 p-5 backdrop-blur-lg backdrop-filter dark:border-neutral-700 dark:bg-neutral-800">
      <nav className="container mx-auto flex flex-col gap-4 lg:flex-row lg:justify-between">
        <ul className="flex items-center justify-center gap-8 lg:gap-5">
          {menuItems.map((menuItem) => {
            const { path, label } = menuItem;

            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`uppercase duration-75 ease-in hover:text-primary ${
                    location.pathname === path
                      ? "font-medium text-primary"
                      : "text-slate-800 dark:text-white dark:hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex w-full flex-col items-center  justify-center gap-5 lg:flex-row">
          <div className="lg:flex lg:w-full lg:justify-end lg:pr-8 xl:pr-24">
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
                  className={`w-full rounded-full border border-slate-500 px-4 py-2 text-slate-700 outline-none placeholder:text-gray-300 sm:min-w-72 lg:block ${searchInputActive ? "block opacity-100" : "pointer-events-none hidden opacity-0"}`}
                  placeholder={placeholder}
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
                  className="hover:fill-slate-600 dark:fill-white hover:dark:fill-slate-300"
                >
                  <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
              </button>
            </div>

            <div className="relative flex">
              <label className="relative">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  onChange={showHidePopupTheme}
                  checked={isVisibleTheme}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="rgba(151,151,151,1)"
                  className="peer-hover:fill-slate-600 dark:fill-white hover:dark:fill-slate-300"
                >
                  <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
                </svg>
              </label>

              {/* Popup Theme */}
              {isVisibleTheme && (
                <div className="fixed top-44 z-10 min-w-36 -translate-x-12  rounded-md border border-slate-300 bg-white py-1 shadow-lg lg:top-20 lg:-translate-x-28">
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-3 py-2 hover:bg-blue-50"
                    onClick={() => changeTheme("light")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill={`rgba(151,151,151,1)  `}
                    >
                      <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
                    </svg>
                    <span className="text-sm font-medium text-slate-600">
                      Light
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-3 py-2 hover:bg-blue-50"
                    onClick={() => changeTheme("dark")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="rgba(151,151,151,1)"
                    >
                      <path d="M10 6C10 10.4183 13.5817 14 18 14C19.4386 14 20.7885 13.6203 21.9549 12.9556C21.4738 18.0302 17.2005 22 12 22C6.47715 22 2 17.5228 2 12C2 6.79948 5.9698 2.52616 11.0444 2.04507C10.3797 3.21152 10 4.56142 10 6ZM4 12C4 16.4183 7.58172 20 12 20C14.9654 20 17.5757 18.3788 18.9571 15.9546C18.6407 15.9848 18.3214 16 18 16C12.4772 16 8 11.5228 8 6C8 5.67863 8.01524 5.35933 8.04536 5.04293C5.62119 6.42426 4 9.03458 4 12ZM18.1642 2.29104L19 2.5V3.5L18.1642 3.70896C17.4476 3.8881 16.8881 4.4476 16.709 5.16417L16.5 6H15.5L15.291 5.16417C15.1119 4.4476 14.5524 3.8881 13.8358 3.70896L13 3.5V2.5L13.8358 2.29104C14.5524 2.1119 15.1119 1.5524 15.291 0.835829L15.5 0H16.5L16.709 0.835829C16.8881 1.5524 17.4476 2.1119 18.1642 2.29104ZM23.1642 7.29104L24 7.5V8.5L23.1642 8.70896C22.4476 8.8881 21.8881 9.4476 21.709 10.1642L21.5 11H20.5L20.291 10.1642C20.1119 9.4476 19.5524 8.8881 18.8358 8.70896L18 8.5V7.5L18.8358 7.29104C19.5524 7.1119 20.1119 6.5524 20.291 5.83583L20.5 5H21.5L21.709 5.83583C21.8881 6.5524 22.4476 7.1119 23.1642 7.29104Z"></path>
                    </svg>
                    <span className="text-sm font-medium text-slate-600">
                      Dark
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
