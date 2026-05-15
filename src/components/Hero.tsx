import { motion } from "motion/react";
import { ChevronRight, Play, Trophy, Users, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero({ onOpenSubmit }: { onOpenSubmit: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExploreClick = () => {
    if (location.pathname !== '/') {
      navigate('/?scroll=feed');
    } else {
      document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 pulsing-gradient opacity-30 blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center gap-6"
          >
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted">AESTHETIC ACHIEVEMENT HUB</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 font-display text-8xl leading-[0.8] text-white sm:text-9xl lg:text-[14rem] uppercase tracking-[-0.04em]"
          >
            PEAK <span className="text-muted/20">PERF<br />ORMA</span>NCE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="mb-16 max-w-2xl text-lg leading-relaxed text-muted/60 md:text-xl font-medium tracking-tight"
          >
            The world's most comprehensive catalog of human capability. Verified in real-time, presented with surgical precision. Explore the edge of what's possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={handleExploreClick}
              className="flex items-center gap-2 rounded-2xl bg-accent px-10 py-5 text-lg font-black text-black shadow-[0_20px_50px_rgba(245,158,11,0.2)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tight"
            >
              Explore Records
              <ChevronRight size={22} strokeWidth={3} />
            </button>
            <button 
              onClick={onOpenSubmit}
              className="group flex items-center gap-4 px-8 py-4 text-base font-bold text-muted transition-all hover:text-white uppercase tracking-widest"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
                 <Play size={18} className="fill-white ml-1" />
              </div>
              Submit Record
            </button>
          </motion.div>

          {/* Stats Section as Bento Grid Row */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
          >
            <div className="bento-card flex flex-col items-center justify-center py-10">
              <p className="font-mono text-5xl font-black text-white tracking-tighter">12.8<span className="text-accent text-3xl">k</span></p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mt-2">Verified Records</p>
            </div>
            <div className="bento-card flex flex-col items-center justify-center py-10">
              <p className="font-mono text-5xl font-black text-white tracking-tighter">24<span className="text-accent text-3xl">/7</span></p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mt-2">Active Monitoring</p>
            </div>
            <div className="bento-card flex flex-col items-center justify-center py-10">
              <p className="font-mono text-5xl font-black text-white tracking-tighter">850<span className="text-accent text-3xl">+</span></p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mt-2">New Monthly Submissions</p>
            </div>
            <div className="bento-card flex flex-col items-center justify-center py-10">
              <p className="font-mono text-5xl font-black text-white tracking-tighter">192<span className="text-accent text-3xl"></span></p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mt-2">Participating Nations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
