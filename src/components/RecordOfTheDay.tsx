import { useState, useEffect } from 'react';
import { WorldRecord } from '../types';
import { INITIAL_RECORDS } from '../constants';
import { motion } from 'motion/react';
import { Trophy, Star, ArrowRight, Share2, Heart } from 'lucide-react';
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
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="bento-card relative overflow-hidden bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy size={120} strokeWidth={1} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div className="mb-6 flex items-center gap-3">
              <span className="bg-accent px-3 py-1 rounded text-[10px] font-black text-black uppercase tracking-widest">
                Record of the Day
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted uppercase tracking-widest">
                <Star size={12} className="text-accent fill-accent" />
                Featured Achievement
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-white mb-6 leading-none">
              {record.title}
            </h2>

            <p className="text-lg text-muted mb-8 leading-relaxed max-w-xl">
              {record.description}
            </p>

            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Holder</p>
                <p className="text-lg font-bold text-white">{record.holder}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Location</p>
                <p className="text-lg font-bold text-white">{record.location}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Category</p>
                <p className="text-lg font-bold text-white uppercase italic">{record.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/record/${record.id}`)}
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-black transition-all hover:bg-accent active:scale-95"
              >
                In-Depth Story
                <ArrowRight size={18} strokeWidth={3} />
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert("Liked!")}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted hover:text-accent hover:border-accent transition-all"
                >
                  <Heart size={20} />
                </button>
                <button 
                  onClick={() => alert("Shared!")}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted hover:text-white hover:border-white transition-all"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
             <img 
               src={record.imageUrl} 
               alt={record.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
             <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  Est. {new Date(record.dateSet).getFullYear()}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
