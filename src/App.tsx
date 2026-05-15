/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecordOfTheDay from "./components/RecordOfTheDay";
import Feed from "./components/Feed";
import RecordDetail from "./components/RecordDetail";
import SubmitRecordModal from "./components/SubmitRecordModal";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Globe, History, TrendingUp, Sparkles, LogIn, Plus } from "lucide-react";
import { signInWithGoogle } from "./lib/firebase";
import { useState } from "react";

function HomePage({ user, searchQuery, onOpenSubmit }: { user: any; searchQuery: string; onOpenSubmit: () => void }) {
  return (
    <>
      <Hero onOpenSubmit={onOpenSubmit} />
      
      {/* Featured Section */}
      <div className="border-y border-white/5 bg-white/5 py-8 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 md:gap-16">
            {[
              { icon: <TrendingUp className="text-accent" />, label: "Trending" },
              { icon: <History className="text-accent" />, label: "Recently Broken" },
              { icon: <Sparkles className="text-accent" />, label: "Record Insights" },
              { icon: <Globe className="text-accent" />, label: "Global Map" }
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => alert(`${item.label} feature coming soon!`)}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted hover:text-white transition-colors cursor-pointer group"
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
      </div>

      <RecordOfTheDay />

      <div id="feed">
        <Feed searchQuery={searchQuery} />
      </div>

      {/* Call to Action for non-logged in users */}
      {!user && (
        <section className="mx-auto max-w-5xl px-4 py-24 text-center">
          <div className="bento-card bg-accent text-black border-none p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-black/10 blur-3xl group-hover:bg-black/20 transition-all duration-700" />
              <h2 className="mb-6 font-display text-5xl uppercase text-black md:text-8xl leading-none tracking-tighter">
                Start Your <span className="italic opacity-60">Legacy</span>
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-black font-bold uppercase text-xs tracking-widest opacity-70">
                Join the global community of record breakers. Track, verify, and celebrate the extraordinary deeds that define human potential.
              </p>
              <button 
              onClick={() => signInWithGoogle()}
              className="group flex mx-auto items-center gap-3 rounded-2xl bg-black px-12 py-5 text-xl font-black text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <LogIn size={24} strokeWidth={3} />
                CONNECT PROFILE
              </button>
          </div>
        </section>
      )}
    </>
  );
}

function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#030303]">
      <motion.div 
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-orange-600/[0.03] blur-[160px]"
      />
      <motion.div 
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-white/[0.015] blur-[140px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,1)_100%)]" />
    </div>
  );
}

export default function App() {
  const { user, profile, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-orange-600 opacity-20" />
            <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-orange-600" />
          </div>
          <p className="font-display text-xl uppercase tracking-widest text-neutral-500 animate-pulse">Initializing Pulse...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-neutral-950 selection:bg-orange-600 selection:text-white">
        <BackgroundAnimation />
        <Navbar 
          user={user} 
          profile={profile} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage user={user} searchQuery={searchQuery} onOpenSubmit={() => setIsSubmitModalOpen(true)} />} />
            <Route path="/record/:id" element={<RecordDetail />} />
          </Routes>
        </main>

        <SubmitRecordModal 
          isOpen={isSubmitModalOpen} 
          onClose={() => setIsSubmitModalOpen(false)} 
        />

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#050505] pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-16 md:grid-cols-4">
             <div className="col-span-2 md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-8 group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-black group-hover:scale-110 transition-transform">
                    <div className="w-3 h-3 bg-black rounded-sm"></div>
                  </div>
                  <span className="font-display text-2xl tracking-tight uppercase text-white">RecordStream</span>
                </Link>
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-muted">
                  The ultimate hub for extraordinary human achievement. Real-time verification, global insights, and the pulse of world records.
                </p>
             </div>
             
             <div>
               <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-accent">Navigation</h4>
               <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted">
                 <li><button onClick={() => document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Records Grid</button></li>
                 <li><button onClick={() => document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Categories</button></li>
                 <li><button onClick={() => alert("Leaderboard coming soon!")} className="hover:text-white transition-colors">Leaderboard</button></li>
               </ul>
             </div>

             <div>
               <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-accent">Platform</h4>
               <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted">
                 <li><a href="#" className="hover:text-white transition-colors">Methodology</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Verification</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Terms of Pulse</a></li>
               </ul>
             </div>

             <div>
               <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-accent">Connect</h4>
               <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted">
                 <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">X / Twitter</a></li>
               </ul>
             </div>
          </div>
          
          <div className="mt-24 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10 gap-6">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-800">© 2026 RECORDSTREAM. ESTABLISHING INFINITY.</p>
             <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                <Globe size={14} className="text-accent" />
                <span>Global Ops / HQ</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
    </Router>
  );
}

