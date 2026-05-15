import { useState, useEffect } from 'react';
import { WorldRecord } from '../types';
import { INITIAL_RECORDS } from '../constants';
import { motion } from 'motion/react';
import { Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RecordOfTheDay() {
  const [record, setRecord] = useState<WorldRecord | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Select one based on the day of the year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % INITIAL_RECORDS.length;
    setRecord(INITIAL_RECORDS[index]);
  }, []);

  if (!record) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="bento-card relative overflow-hidden bg-[#0a0a0a] border-white/5 !p-0">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <Trophy size={300} strokeWidth={0.5} />
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2 p-12 md:p-20">
            <div className="mb-12 flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">
                DAILTY FEATURED RECORD
              </span>
            </div>

            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter text-white mb-10 leading-[0.85]">
              {record.title}
            </h2>

            <p className="text-xl text-muted/60 mb-12 leading-relaxed max-w-xl font-medium tracking-tight">
              {record.description}
            </p>

            <div className="grid grid-cols-2 gap-10 mb-16 border-y border-white/[0.03] py-10">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted/40 mb-3">Record Holder</p>
                <p className="text-xl font-bold text-white tracking-tight">{record.holder}</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted/40 mb-3">Classification</p>
                <p className="text-xl font-bold text-accent uppercase tracking-tighter italic">{record.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(`/record/${record.id}`)}
                className="flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-accent active:scale-95"
              >
                In-Depth Story
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative bg-neutral-900 overflow-hidden group min-h-[400px]">
             <img 
               src={record.imageUrl} 
               alt={record.title} 
               className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
