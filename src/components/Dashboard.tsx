import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { 
  Trophy, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MapPin,
  ChevronRight,
  Plus
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DashboardProps {
  profile: UserProfile;
}

const MOCK_DATA = [
  { name: 'Jan', submissions: 4 },
  { name: 'Feb', submissions: 7 },
  { name: 'Mar', submissions: 5 },
  { name: 'Apr', submissions: 12 },
  { name: 'May', submissions: 9 },
  { name: 'Jun', submissions: 15 },
];

export default function Dashboard({ profile }: DashboardProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="mb-4 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-accent/80">
            <div className="w-12 h-[1px] bg-accent/30" />
            OPERATIONAL COMMAND
          </div>
          <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-white leading-[0.85]">
            {profile.username || 'AGENT'}<span className="text-muted/40 italic">.HUB</span>
          </h1>
        </div>

        <div className="flex gap-4">
          <div className="bento-card !py-4 px-8 border-white/10 flex items-center gap-4">
             <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20">
               <img src={profile.photoURL || ''} alt="" className="h-full w-full object-cover" />
             </div>
             <div>
               <p className="text-[10px] font-black text-muted uppercase tracking-widest">Global Rank</p>
               <p className="text-xl font-bold text-white tracking-tight">#{Math.floor(Math.random() * 1000) + 1}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card border-white/5 bg-white/[0.02] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Trophy size={120} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-4">Total Integrity Points</p>
              <h3 className="text-6xl font-black text-white tracking-tighter mb-2">
                {profile.stats?.points || 0}<span className="text-accent text-3xl">XP</span>
              </h3>
              <p className="text-xs font-bold text-muted/60 uppercase tracking-widest">+12% from last cycle</p>
            </div>
          </div>

          <div className="bento-card border-white/5 bg-white/[0.02] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Zap size={120} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-4">Verified Records</p>
              <h3 className="text-6xl font-black text-white tracking-tighter mb-2">
                {profile.stats?.recordsSubmitted || 0}<span className="text-muted/40 text-3xl">/SEC</span>
              </h3>
              <p className="text-xs font-bold text-muted/60 uppercase tracking-widest">Global Elite Status</p>
            </div>
          </div>

          <div className="bento-card lg:col-span-2 border-white/5 bg-black !p-0 overflow-hidden">
            <div className="p-8 border-b border-white/[0.03] flex items-center justify-between">
              <div>
                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-1">Visual Analytics</h4>
                <p className="text-xs text-muted font-bold tracking-widest uppercase">Activity metrics (6 month span)</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-muted uppercase tracking-widest">Real-time Data</span>
              </div>
            </div>
            <div className="h-[300px] w-full p-8 pr-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    fontWeight="bold" 
                    tickFormatter={(val) => val.toUpperCase()} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 'dataMax + 5']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a0a', 
                      border: '1px solid #ffffff10', 
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="submissions" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSub)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar / Recent Items */}
        <div className="space-y-6">
           <div className="bento-card border-white/5 bg-accent/5 p-8">
              <h4 className="text-[10px] font-black uppercase text-accent tracking-[0.3em] mb-6 flex items-center gap-2">
                <ShieldCheck size={14} />
                SECURITY CLEARANCE
              </h4>
              <p className="text-lg font-bold text-white mb-6 tracking-tight leading-snug">
                Your profile is active on the global ledger. You can now submit unofficial attempts for verification.
              </p>
              <button className="w-full flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all group">
                Review Guidelines
                <ChevronRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           <div className="bento-card border-white/5 bg-white/[0.01]">
              <h4 className="text-[10px] font-black uppercase text-muted tracking-[0.3em] mb-8">RECENT LOGS</h4>
              <div className="space-y-6">
                {[
                  { title: "Profile Initialized", time: "2m ago", type: "system" },
                  { title: "Identity Claimed", time: "5m ago", type: "auth" },
                  { title: "System Scan", time: "1h ago", type: "system" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-help">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-white uppercase tracking-tight">{log.title}</p>
                      <p className="text-[9px] font-black text-muted/40 uppercase tracking-widest">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
