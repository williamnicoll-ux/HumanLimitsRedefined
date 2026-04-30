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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="bento-card group relative flex flex-col overflow-hidden cursor-pointer"
    >
      <Link to={`/record/${record.id}`} className="absolute inset-0 z-20" />
      
      {/* Absolute Badges */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-neutral-300 backdrop-blur-md border border-white/10">
          <TrophyIcon size={12} className="text-accent" />
          {record.category}
        </span>
        {record.isVerified && (
          <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
            <ShieldCheck size={12} />
            Verified
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden -mx-6 -mt-6 mb-6">
        <img
          src={record.imageUrl}
          alt={record.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bento-card via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted">
          <Calendar size={12} />
          {new Date(record.dateSet).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        <h3 className="mb-3 font-display text-2xl leading-tight text-white group-hover:text-accent transition-colors">
          {record.title}
        </h3>

        <p className="mb-6 line-clamp-2 text-xs font-medium leading-relaxed text-muted">
          {record.description}
        </p>

        {/* Footer Meta */}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs font-bold text-white">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted border border-white/5">
               {record.holder[0]}
             </div>
             <div>
               <p className="text-[10px] uppercase text-muted leading-none mb-1 font-black tracking-widest">Record Holder</p>
               <p>{record.holder}</p>
             </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex gap-4 relative z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); alert("Liked!"); }}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
              >
                <Heart size={16} />
                <span className="font-mono font-bold">{record.likesCount}</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); alert("Comments coming soon!"); }}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
              >
                <MessageSquare size={16} />
                <span className="font-mono font-bold">{record.commentsCount}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted tracking-widest relative z-30">
               <MapPin size={12} className="text-accent" />
               {record.location}
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
