import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { WorldRecord } from '../types';
import RecordCard from './RecordCard';
import { INITIAL_RECORDS } from '../constants';
import { Loader2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useLocation } from 'react-router-dom';

export default function Feed({ searchQuery = "" }: { searchQuery?: string }) {
  const [records, setRecords] = useState<WorldRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('scroll=feed')) {
      setTimeout(() => {
        document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location]);

  useEffect(() => {
    const q = query(collection(db, 'records'), orderBy('timestamp', 'desc'), limit(20));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbRecords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as WorldRecord);
      
      // Combine Firestore data with INITIAL_RECORDS, ensuring no duplicates by ID
      const combined = [...dbRecords];
      const dbIds = new Set(dbRecords.map(r => r.id));
      
      INITIAL_RECORDS.forEach(record => {
        if (!dbIds.has(record.id)) {
          combined.push(record);
        }
      });

      // Sort by timestamp if available
      combined.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      
      setRecords(combined);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'records');
      setRecords(INITIAL_RECORDS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredRecords = records.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.holder.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-sm font-medium text-muted uppercase tracking-widest animate-pulse">Syncing Pulse Records...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-2xl">
           <div className="mb-6 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-accent/80">
             <div className="w-12 h-[1px] bg-accent/30" />
             LIVE STREAM GRID
           </div>
           <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter text-white leading-[0.85]">
             HUMAN <span className="text-muted/40 italic">ACHIEVEMENTS</span>
           </h2>
        </div>
        
        <div className="flex flex-wrap gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
           {['All', 'Sport', 'Skill', 'Body', 'Gaming', 'Troll'].map((cat) => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={cn(
                 "rounded-full px-6 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all duration-300",
                 activeCategory === cat 
                   ? "bg-accent text-black shadow-[0_10px_30px_rgba(245,158,11,0.2)]" 
                   : "text-muted hover:text-white"
               )}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecords.map((record, i) => (
            <RecordCard key={record.id} record={record} index={i} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-3xl bg-white/5"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-muted">
            <Zap size={32} />
          </div>
          <h3 className="mb-2 font-display text-2xl uppercase text-white">No records found</h3>
          <p className="max-w-xs text-sm text-muted">
            Nothing currently matches "{activeCategory}" {searchQuery && `and "${searchQuery}"`}. Be the first to establish a legacy in this category!
          </p>
          <button 
            onClick={() => { setActiveCategory('All'); }}
            className="mt-8 text-xs font-black uppercase tracking-widest text-accent hover:underline"
          >
            Show All Records
          </button>
        </motion.div>
      )}
    </section>
  );
}
