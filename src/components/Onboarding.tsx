import { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { UserProfile } from '../types';
import { Check, Sparkles, User, ArrowRight, Loader2 } from 'lucide-react';

interface OnboardingProps {
  profile: UserProfile;
  onComplete: () => void;
}

export default function Onboarding({ profile, onComplete }: OnboardingProps) {
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const checkUsername = async (val: string) => {
    if (val.length < 3) {
      setIsAvailable(null);
      return;
    }
    
    setIsChecking(true);
    setError('');
    
    try {
      const q = query(collection(db, 'users'), where('username', '==', val.toLowerCase()));
      const snap = await getDocs(q);
      setIsAvailable(snap.empty);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAvailable || isSubmitting || !username) return;

    setIsSubmitting(true);
    try {
      const docRef = doc(db, 'users', profile.uid);
      await updateDoc(docRef, {
        username: username.toLowerCase(),
        // Initialize other fields if needed
      });
      onComplete();
    } catch (err) {
      setError('Failed to save username. Try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg"
      >
        <div className="bento-card border-white/10 !p-12 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/10 text-accent mb-8">
            <Sparkles size={40} />
          </div>

          <h1 className="font-display text-5xl uppercase tracking-tighter text-white mb-4 leading-none">
            CLAIM YOUR <br />
            <span className="text-muted">IDENTITY</span>
          </h1>
          
          <p className="text-muted/60 mb-10 text-lg font-medium tracking-tight">
            Choose a unique handle to access elite analytics and start tracking your own records.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted/30">
                <User size={20} />
              </div>
              <input 
                type="text"
                placeholder="Unique handle..."
                value={username}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
                  setUsername(val);
                  checkUsername(val);
                }}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-white font-bold tracking-tight focus:border-accent focus:bg-white/[0.05] transition-all outline-none text-xl"
                autoFocus
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                {isChecking ? (
                  <Loader2 className="animate-spin text-accent" size={20} />
                ) : isAvailable === true ? (
                  <Check className="text-green-500" size={24} strokeWidth={3} />
                ) : isAvailable === false ? (
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Taken</span>
                ) : null}
              </div>
            </div>

            {error && <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{error}</p>}

            <button 
              disabled={!isAvailable || isSubmitting}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white disabled:bg-white/10 disabled:text-muted/30 py-6 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-accent active:scale-95 shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
            >
              {isSubmitting ? 'Syncing...' : 'Initialize Profile'}
              <ArrowRight size={18} strokeWidth={3} />
            </button>
          </form>

          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted/30">
            Lowercase alpha-numeric and underscores only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
