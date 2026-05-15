import { WorldRecord } from "../types";
import { motion } from "motion/react";
import { Heart, MessageSquare, MapPin, Calendar, ShieldCheck } from "lucide-react";
import { Link } from 'react-router-dom';

interface RecordCardProps {
  record: WorldRecord;
  index: number;
}

export default function RecordCard({ record, index }: RecordCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className="bento-card group relative flex flex-col overflow-hidden cursor-pointer !p-0"
    >
      <Link to={`/record/${record.id}`} className="absolute inset-0 z-20" />
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={record.imageUrl}
          alt={record.title}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        {/* Badges Overlay */}
        <div className="absolute top-6 left-6 z-10 flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-xl border border-white/10">
            {record.category}
          </span>
          {record.isVerified && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-black shadow-xl">
              <ShieldCheck size={11} strokeWidth={3} />
              Verified
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-8 pt-2">
        <div className="mb-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-muted">
          <Calendar size={11} />
          {new Date(record.dateSet).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </div>

        <h3 className="mb-4 font-display text-2xl leading-[1.1] text-white tracking-tight group-hover:text-accent transition-colors duration-300">
          {record.title}
        </h3>

        <p className="mb-8 line-clamp-2 text-sm font-medium leading-relaxed text-muted/80">
          {record.description}
        </p>

        {/* Footer Meta */}
        <div className="mt-auto pt-6 border-t border-white/[0.03]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] text-[10px] font-black text-muted border border-white/5 uppercase">
                 {record.holder[0]}
               </div>
               <span className="text-[11px] font-bold text-white tracking-tight">{record.holder}</span>
            </div>
            
            <div className="flex items-center gap-4 relative z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="flex items-center gap-1.5 text-[11px] text-muted hover:text-white transition-colors"
              >
                <Heart size={14} />
                <span className="font-mono">{record.likesCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrophyIcon({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
