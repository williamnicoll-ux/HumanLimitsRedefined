import { User } from "firebase/auth";
import { UserProfile } from "../types";
import { LogIn, LogOut, User as UserIcon, Trophy, Settings } from "lucide-react";
import { signInWithGoogle, logout } from "../lib/firebase";
import { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  user: User | null;
  profile: UserProfile | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ user, profile, searchQuery, setSearchQuery }: NavbarProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("navbar-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCategoriesClick = () => {
    if (location.pathname !== '/') {
      navigate('/?scroll=feed');
    } else {
      document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/' && e.target.value.length > 0) {
      navigate('/');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <span className="font-display text-xl tracking-tight uppercase md:block hidden text-white">
              Record<span className="text-accent">Stream</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className="text-accent">Explore</Link>
              <button 
                onClick={handleCategoriesClick}
                className="text-muted hover:text-white transition-colors"
              >
                Categories
              </button>
              <button 
                onClick={() => alert("Leaderboard coming soon!")}
                className="text-muted hover:text-white transition-colors"
              >
                Leaderboard
              </button>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

            <div className="hidden lg:flex items-center gap-3 bg-white/5 rounded-full pl-4 pr-1 py-1 border border-white/10 focus-within:border-accent transition-colors group">
              <input 
                id="navbar-search"
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-muted w-32 focus:w-48 transition-all"
              />
              <div className="w-10 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] text-muted font-bold tracking-tighter">⌘K</div>
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end leading-none">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{profile?.displayName || user.displayName}</span>
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="text-muted hover:text-white transition-colors"
                      title="Edit Profile"
                    >
                      <Settings size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => logout()}
                    className="text-[10px] uppercase tracking-wider text-muted hover:text-accent transition-colors"
                  >
                    Logout
                  </button>
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 ring-2 ring-accent/10">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900">
                      <UserIcon size={20} className="text-muted" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-accent"
              >
                <LogIn size={18} />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {profile && (
        <EditProfile 
          profile={profile} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </>
  );
}

