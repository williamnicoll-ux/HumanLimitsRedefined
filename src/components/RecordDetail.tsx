import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { WorldRecord } from '../types';
import { INITIAL_RECORDS } from '../constants';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Trophy, 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  Share2,
  Clock,
  History
} from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function RecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<WorldRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecord() {
      if (!id) return;
      
      try {
        const docRef = doc(db, 'records', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRecord({ id: docSnap.id, ...docSnap.data() } as WorldRecord);
        } else {
          // Check constants
          const found = INITIAL_RECORDS.find(r => r.id === id);
          if (found) {
            setRecord(found);
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `records/${id}`);
      } finally {
        setLoading(false);
      }
    }

    fetchRecord();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
        <h2 className="font-display text-4xl mb-4 uppercase">Record Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={18} />
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-24">
      {/* Hero Header */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={record.imageUrl} 
          alt={record.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        
        <div className="absolute top-8 left-4 md:left-8">
           <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-bold text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
           >
             <ArrowLeft size={18} />
             Back
           </button>
        </div>

        <div className="absolute bottom-12 left-4 md:left-8 right-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-accent px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                {record.category}
              </span>
              {record.isVerified && (
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                  <ShieldCheck size={12} className="text-accent" />
                  Verified Record
                </span>
              )}
            </div>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white leading-[0.85]">
              {record.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bento-card">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-2">
                <Trophy size={16} />
                Achievement Details
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-neutral-200">
                {record.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bento-card flex flex-col gap-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-muted">The Milestone</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <Calendar className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-muted leading-none mb-1">Date Established</p>
                      <p className="text-xl font-bold text-white">
                        {new Date(record.dateSet).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
               </div>

               <div className="bento-card flex flex-col gap-4 text-accent">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-muted">History</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <History className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-muted leading-none mb-1">Legacy Duration</p>
                      <p className="text-xl font-bold text-white">
                        {Math.floor((Date.now() - new Date(record.dateSet).getTime()) / (1000 * 60 * 60 * 24 * 365))} Years Standing
                      </p>
                    </div>
                  </div>
               </div>
            </div>

            {/* AI Insights Card */}
            <div className="bento-card bg-accent text-black border-none relative overflow-hidden group">
               <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-black/10 rounded-full blur-3xl group-hover:bg-black/20 transition-all duration-700" />
               <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Pulse Insight</h3>
               <p className="text-2xl font-black italic tracking-tight leading-tight">
                 "This record represents a 15% increase in human efficiency compared to the previous benchmark set in 2018."
               </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bento-card">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">Credential Panel</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl font-bold text-muted border border-white/10">
                    {record.holder[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted leading-none mb-1">Record Holder</p>
                    <p className="font-bold text-white">{record.holder}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted leading-none mb-1">Location</p>
                    <p className="font-bold text-white">{record.location}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 p-4 border border-white/10 hover:border-accent group transition-all">
                    <Heart className="text-muted group-hover:text-accent group-hover:fill-accent" size={24} />
                    <span className="font-mono text-sm font-bold text-white">{record.likesCount}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 p-4 border border-white/10 hover:border-accent group transition-all">
                    <Share2 className="text-muted group-hover:text-white" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-white">Share</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bento-card border-none bg-neutral-900">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-4">Tags</h3>
               <div className="flex flex-wrap gap-2">
                 {record.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 rounded-lg bg-black/40 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border border-white/5 hover:border-white/20 cursor-pointer">
                     #{tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
