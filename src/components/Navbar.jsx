import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [linkMenu, setLinkMenu] = useState(false);
  const toggleMenu = () => {
    setLinkMenu((prev) => !prev);
  };

  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const { currentUser, loading, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setLinkMenu(false);
      await logout();
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Failed to log out.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <nav
      className="
    flex justify-between items-center
    px-8 py-4 rounded-2xl
    border-b border-slate-200 dark:border-white/10
    transition-colors duration-300"
    >
      <Link
        to="/"
        className="
        text-xl font-bold tracking-tight
        text-cyan-600 dark:text-cyan-400
        hover:opacity-80 transition-opacity"
      >
        MOVIE APP
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="
            w-10 h-10 rounded-full
            bg-cyan-500/20
            dark:bg-cyan-400
            text-slate-800
            dark:text-slate-950
            hover:opacity-90
            transition-all cursor-pointer"
          aria-label="Toggle Theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="
            w-10 h-10 rounded-full
            bg-cyan-500/20
            dark:bg-cyan-400
            flex items-center justify-center
            text-slate-800
            dark:text-slate-950
            hover:opacity-90
            transition-colors cursor-pointer"
          >
            👤
          </button>

          {linkMenu && (
            <div
              className="
            absolute right-0 mt-3 w-48
            bg-white dark:bg-zinc-900
            border border-slate-200 dark:border-white/10
            rounded-2xl shadow-2xl p-2
            flex flex-col gap-1 z-50"
            >
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="
                  w-full text-left px-4 py-2.5
                  text-sm font-medium text-red-500
                  hover:bg-red-500/10 rounded-xl
                  transition-colors cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    onClick={() => setLinkMenu(false)}
                    className="
                    w-full text-left px-4 py-2.5
                    text-sm font-medium
                    text-slate-700 dark:text-zinc-200
                    hover:bg-slate-100 dark:hover:bg-white/5
                    rounded-xl transition-colors"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="/login"
                    onClick={() => setLinkMenu(false)}
                    className="
                    w-full text-left px-4 py-2.5
                    text-sm font-medium
                    text-slate-700 dark:text-zinc-200
                    hover:bg-slate-100 dark:hover:bg-white/5
                    rounded-xl transition-colors"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
