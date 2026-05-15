import { User } from "firebase/auth";
import { UserProfile } from "../types";
import { LogIn, LogOut, User as UserIcon, Trophy, Settings, ArrowRight } from "lucide-react";
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
      <nav className="sticky top-0 z-50 w-full border-b border-white/[0.03] bg-[#030303]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-black text-black shadow-[0_0_40px_rgba(245,158,11,0.15)] group-hover:scale-105 group-active:scale-95 transition-all duration-300">
              <div className="w-5 h-5 bg-black rounded-md transform rotate-12 group-hover:rotate-0 transition-transform"></div>
              <div className="absolute inset-0 rounded-xl border border-white/20"></div>
            </div>
            <span className="font-display text-2xl tracking-[-0.05em] uppercase md:block hidden text-white">
              PEAK<span className="text-muted/40">ACHIVE</span>
            </span>
          </Link>

          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
              <Link to="/" className="text-accent hover:text-white transition-colors">Digital Grid</Link>
              <button 
                onClick={handleCategoriesClick}
                className="text-muted/60 hover:text-white transition-colors"
              >
                Categories
              </button>
              <button 
                onClick={() => alert("Leaderboard coming soon!")}
                className="text-muted/60 hover:text-white transition-colors"
              >
                Elite Rank
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] rounded-full pl-5 pr-2 py-1.5 border border-white/[0.05] focus-within:border-white/20 transition-all duration-300 group">
              <input 
                id="navbar-search"
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent border-none outline-none text-[11px] font-bold text-white placeholder:text-muted/30 w-36 focus:w-56 transition-all"
              />
              <div className="px-2 py-1 bg-white/[0.05] rounded-md text-[9px] text-muted/40 font-black tracking-tighter">⌘K</div>
            </div>

            {user ? (
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-tight text-white">{profile?.displayName || user.displayName}</span>
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="text-muted/40 hover:text-white transition-colors"
                    >
                      <Settings size={13} />
                    </button>
                  </div>
                  <button 
                    onClick={() => logout()}
                    className="text-[9px] font-black uppercase tracking-[0.1em] text-muted/30 hover:text-accent transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border border-white/[0.05] p-0.5 ring-2 ring-accent/5">
                   {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/[0.03] rounded-full">
                      <UserIcon size={18} className="text-muted/40" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="group relative flex items-center gap-3 rounded-full bg-white px-8 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-accent active:scale-95"
              >
                Connect identity
                <ArrowRight size={14} strokeWidth={3} />
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

